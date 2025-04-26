import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentReplyDto {
    @IsNotEmpty()
    @IsString()
    writer: string;

    @IsNotEmpty()
    @IsString()
    content: string;
}
