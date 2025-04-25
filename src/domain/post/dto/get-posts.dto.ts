import { PagingDto } from '../../../shared/dto/paging.dto';
import { IsOptional, IsString } from 'class-validator';

export class GetPostsDto extends PagingDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    writer: string;
}
