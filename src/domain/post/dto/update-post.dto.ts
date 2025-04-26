import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    content: string;

    // 작성자는 수정 불가능하다고 가정

    @IsNotEmpty()
    @IsString()
    password: string;
}
