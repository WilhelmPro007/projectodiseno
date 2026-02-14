import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../core/database/prisma.service';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { Prisma } from '@prisma/client';

// Interface para asegurar el tipado fuerte ante inconsistencias del cliente Prisma
interface UserWithRole {
    id: number;
    email: string;
    password?: string;
    name: string | null;
    isActive: boolean;
    role: {
        id: number;
        name: string;
    };
}

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        // Eliminamos el cast 'as any' y usamos el tipado nativo de Prisma
        const user = await this.prisma.user.create({
            data: createUserDto as Prisma.UserUncheckedCreateInput,
            include: { role: true },
        }) as unknown as UserWithRole;

        return new UserEntity({
            ...user,
            role: new RoleEntity(user.role),
        });
    }

    async findAll(): Promise<UserEntity[]> {
        const users = await this.prisma.user.findMany({
            where: { isActive: true, deletedAt: null },
            include: { role: true },
        }) as unknown as UserWithRole[];

        return users.map(user => new UserEntity({
            ...user,
            role: new RoleEntity(user.role),
        }));
    }

    async findOne(id: number): Promise<UserEntity> {
        const user = await this.prisma.user.findFirst({
            where: { id, isActive: true, deletedAt: null },
            include: { role: true },
        }) as unknown as UserWithRole;

        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado o inactivo`);
        }

        return new UserEntity({
            ...user,
            role: new RoleEntity(user.role),
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        await this.findOne(id); // Ensure user exists and is active
        const user = await this.prisma.user.update({
            where: { id },
            data: updateUserDto as Prisma.UserUncheckedUpdateInput,
            include: { role: true },
        }) as unknown as UserWithRole;

        return new UserEntity({
            ...user,
            role: new RoleEntity(user.role),
        });
    }

    async remove(id: number): Promise<UserEntity> {
        await this.findOne(id); // Ensure user exists and is active
        const user = await this.prisma.user.update({
            where: { id },
            data: {
                isActive: false,
                deletedAt: new Date(),
            } as Prisma.UserUncheckedUpdateInput,
            include: { role: true },
        }) as unknown as UserWithRole;

        return new UserEntity({
            ...user,
            role: new RoleEntity(user.role),
        });
    }
}



