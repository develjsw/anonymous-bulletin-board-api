import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    writer: string;

    // TODO : 비밀번호 암호화 로직 적용한다고 가정하면 평문으로 받도록 변경
    @IsNotEmpty()
    @IsString()
    password_hash: string;
}
