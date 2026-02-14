import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';

export class AuthResponseDto {
    @ApiProperty({ description: 'JWT Access Token' })
    access_token: string;

    @ApiProperty({ type: UserEntity })
    user: UserEntity;
}
