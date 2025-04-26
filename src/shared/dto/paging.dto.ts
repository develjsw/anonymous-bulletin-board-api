import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PagingDto {
    @ApiProperty({
        description: '요청할 페이지 번호 (1부터 시작)',
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    @Min(1, { message: 'page 는 최소 1 이상이여야 합니다' })
    page: number;

    @ApiProperty({
        description: '한 페이지당 데이터 수',
        example: 10
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    @Min(1, { message: 'perPage 는 최소 1 이상이여야 합니다' })
    perPage: number;
}
