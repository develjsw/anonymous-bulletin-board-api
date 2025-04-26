import { PagingDto } from '../../../shared/dto/paging.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetPostsDto extends PagingDto {
    @ApiPropertyOptional({ description: '검색할 게시글 제목', example: '제목' })
    @IsOptional()
    @IsString()
    title: string;

    @ApiPropertyOptional({ description: '검색할 작성자 이름', example: '홍길동' })
    @IsOptional()
    @IsString()
    writer: string;
}
