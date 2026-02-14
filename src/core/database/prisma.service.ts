import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger(PrismaService.name);

    constructor() {
        const options = PrismaService.getPrismaOptions();
        super(options);

        const url = process.env.DATABASE_URL || '';
        const isSqlite = url.startsWith('file:') || url.endsWith('.db') || process.env.DB_TYPE === 'sqlite';
        this.logger.log(`Prisma initialized in ${isSqlite ? 'SQLite (Adapter)' : 'Native (PostgreSQL/Other)'} mode`);
    }

    private static getPrismaOptions() {
        const url = process.env.DATABASE_URL || '';
        const isSqlite = url.startsWith('file:') || url.endsWith('.db') || process.env.DB_TYPE === 'sqlite';

        if (isSqlite) {
            const adapter = new PrismaBetterSqlite3({
                url: url,
            });
            return { adapter };
        }

        return {
            datasources: {
                db: {
                    url: url,
                },
            },
        };
    }

    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log('Database connected successfully');
        } catch (error) {
            this.logger.error('Failed to connect to database', error.stack);
        }
    }
}

