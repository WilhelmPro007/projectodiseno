import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    create(createUserDto: CreateUserDto) {
        return this.prisma.user.create({
            data: createUserDto,
        });
    }

    findAll() {
        return this.prisma.user.findMany({
            where: { isActive: true, deletedAt: null },
            include: { role: true },
        });
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findFirst({
            where: { id, isActive: true, deletedAt: null },
            include: { role: true },
        });

        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado o inactivo`);
        }

        return user;
    }


    async update(id: number, updateUserDto: UpdateUserDto) {
        await this.findOne(id); // Ensure user exists and is active
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    async remove(id: number) {
        await this.findOne(id); // Ensure user exists and is active
        return this.prisma.user.update({
            where: { id },
            data: {
                isActive: false,
                deletedAt: new Date(),
            },
        });
    }
}
