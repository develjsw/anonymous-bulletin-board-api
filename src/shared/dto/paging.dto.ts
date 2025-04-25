import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PagingDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    @Min(1, { message: 'page 는 최소 1 이상이여야 합니다' })
    page: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    @Min(1, { message: 'perPage 는 최소 1 이상이여야 합니다' })
    perPage: number;
}
