import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    writer: string;

    @IsNotEmpty()
    @IsString()
    content: string;
}
