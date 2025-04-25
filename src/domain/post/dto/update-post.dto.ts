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

    // TODO : 게시글 생성에 암호화 로직 넣는다면 여기도 평문 비밀번호로 받아야함
    @IsNotEmpty()
    @IsString()
    password_hash: string;
}
