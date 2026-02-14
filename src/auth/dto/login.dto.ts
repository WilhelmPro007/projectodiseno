import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsLowercase } from 'class-validator';

export class LoginDto {
    @ApiProperty({ description: 'El correo electrónico del usuario', example: 'usuario@ejemplo.com' })
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    @IsLowercase({ message: 'El correo electrónico debe estar en minúsculas' })
    email: string;

    @ApiProperty({ description: 'La contraseña del usuario' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;
}

