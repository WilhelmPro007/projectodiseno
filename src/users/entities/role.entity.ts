import { ApiProperty } from '@nestjs/swagger';

export class RoleEntity {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    constructor(partial: Partial<RoleEntity>) {
        Object.assign(this, partial);
    }
}
