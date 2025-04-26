import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeletePostDto {
    @ApiProperty({ description: '비밀번호', example: 'password0000' })
    @IsNotEmpty()
    @IsString()
    password: string;
}
