import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { RoleEntity } from './role.entity';

export class UserEntity {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty({ required: false, nullable: true })
    name: string | null;

    @Exclude()
    password?: string;

    @Exclude()
    isActive: boolean;

    @Exclude()
    deletedAt: Date | null;

    @ApiProperty()
    roleId: number;

    @ApiProperty({ type: () => RoleEntity })
    @Type(() => RoleEntity)
    role?: RoleEntity;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}

