import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const roles = [
        { name: 'Admin' },
        { name: 'User' },
    ];

    console.log('Seeding roles...');

    for (const role of roles) {
        const upsertedRole = await prisma.role.upsert({
            where: { name: role.name },
            update: {},
            create: { name: role.name },
        });
        console.log(`- Role ${upsertedRole.name} (ID: ${upsertedRole.id})`);
    }

    console.log('Seed execution finished successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
