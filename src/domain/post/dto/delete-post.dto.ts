import { IsNotEmpty, IsString } from 'class-validator';

export class DeletePostDto {
    // TODO : 게시글 생성에 암호화 로직 넣는다면 여기도 평문 비밀번호로 받아야함
    @IsNotEmpty()
    @IsString()
    password_hash: string;
}
