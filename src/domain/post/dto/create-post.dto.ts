import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty({ description: '게시글 제목', example: '제목을 입력해요' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: '게시글 내용', example: '내용을 입력해요' })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ description: '작성자 이름', example: '홍길동' })
    @IsNotEmpty()
    @IsString()
    writer: string;

    @ApiProperty({ description: '비밀번호', example: 'password0000' })
    @IsNotEmpty()
    @IsString()
    password: string;
}
