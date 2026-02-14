import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')

export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un usuario' })
    @ApiCreatedResponse({ type: UserEntity })
    async create(@Body() createUserDto: CreateUserDto) {
        return new UserEntity(await this.usersService.create(createUserDto));
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiOkResponse({ type: UserEntity, isArray: true })
    async findAll() {
        const users = await this.usersService.findAll();
        return users.map((user) => new UserEntity(user));
    }


    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiOkResponse({ type: UserEntity })
    async findOne(@Param('id') id: string) {
        return new UserEntity(await this.usersService.findOne(+id));
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un usuario por ID' })
    @ApiOkResponse({ type: UserEntity })
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return new UserEntity(await this.usersService.update(+id, updateUserDto));
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un usuario por ID' })
    @ApiOkResponse({ type: UserEntity })
    async remove(@Param('id') id: string) {
        return new UserEntity(await this.usersService.remove(+id));
    }
}

