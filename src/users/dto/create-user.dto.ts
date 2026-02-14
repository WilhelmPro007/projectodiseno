import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ description: 'El correo electrónico del usuario' })
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    email: string;

    @ApiProperty({ description: 'El nombre del usuario', required: false })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'El ID del rol del usuario' })
    @IsInt({ message: 'El roleId debe ser un número entero' })
    @IsNotEmpty({ message: 'El roleId es obligatorio' })
    roleId: number;
}
