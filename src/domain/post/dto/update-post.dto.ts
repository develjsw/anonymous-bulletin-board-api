import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// TODO : 유효성 검증 - 모두 빈값인 경우
export class UpdatePostDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    content: string;

    // TODO : 작성자도 수정 가능한지?

    @IsNotEmpty()
    @IsString()
    password: string;
}
