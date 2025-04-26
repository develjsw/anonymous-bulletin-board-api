import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentReplyDto {
    @ApiProperty({ description: '작성자 이름', example: '홍길동' })
    @IsNotEmpty()
    @IsString()
    writer: string;

    @ApiProperty({ description: '대댓글 내용', example: '저도 동의합니다' })
    @IsNotEmpty()
    @IsString()
    content: string;
}
