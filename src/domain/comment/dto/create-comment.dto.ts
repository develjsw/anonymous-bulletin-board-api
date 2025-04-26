import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty({ description: '작성자 이름', example: '홍길동' })
    @IsNotEmpty()
    @IsString()
    writer: string;

    @ApiProperty({ description: '댓글 내용', example: '좋은 글이네요' })
    @IsNotEmpty()
    @IsString()
    content: string;
}
