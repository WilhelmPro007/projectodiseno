import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from '../users/entities/user.entity';
import { RoleEntity } from '../users/entities/role.entity';
import { Prisma } from '@prisma/client';

// Interface para asegurar el tipado fuerte de los resultados de Prisma con relaciones
// Esta interfaz sigue siendo valiosa para definir exactamente qué esperamos de la DB
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
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto): Promise<{ access_token: string; user: UserEntity }> {
        const { email, password } = loginDto;

        const user = await this.prisma.user.findUnique({
            where: { email },
            include: { role: true },
        }) as unknown as UserWithRole;

        if (!user || user.password !== password) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('El usuario está inactivo');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role.name
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: new UserEntity({
                id: user.id,
                email: user.email,
                name: user.name,
                role: new RoleEntity(user.role),
            }),
        };
    }

    async register(registerDto: RegisterDto): Promise<{ access_token: string; user: UserEntity }> {
        const { email, password, name } = registerDto;

        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('El correo electrónico ya está registrado');
        }

        const defaultRole = await this.prisma.role.findFirst({
            where: { name: 'User' },
        });

        if (!defaultRole) {
            throw new NotFoundException('El rol por defecto "User" no se encuentra en la base de datos.');
        }

        // Eliminamos el cast 'as any' y usamos el tipado nativo de Prisma
        // Prisma.UserUncheckedCreateInput es el tipo correcto para usar roleId
        const user = await this.prisma.user.create({
            data: {
                email,
                password,
                name,
                roleId: defaultRole.id,
            } as Prisma.UserUncheckedCreateInput,
            include: { role: true },
        }) as unknown as UserWithRole;

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role.name
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: new UserEntity({
                id: user.id,
                email: user.email,
                name: user.name,
                role: new RoleEntity(user.role),
            }),
        };
    }
}






