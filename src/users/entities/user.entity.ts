import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty({ required: false, nullable: true })
    name: string | null;

    @Exclude()
    isActive: boolean;

    @Exclude()
    deletedAt: Date | null;

    @ApiProperty()
    roleId: number;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
