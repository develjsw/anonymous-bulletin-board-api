import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
    @ApiPropertyOptional({ description: '수정할 게시글 제목', example: '수정된 제목' })
    @IsOptional()
    @IsString()
    title: string;

    @ApiPropertyOptional({ description: '수정할 게시글 내용', example: '수정된 내용입니다.' })
    @IsOptional()
    @IsString()
    content: string;

    // 작성자는 수정 불가능하다고 가정

    @ApiProperty({ description: '비밀번호', example: 'password0000' })
    @IsNotEmpty()
    @IsString()
    password: string;
}
