import { Injectable } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { Prisma } from '../../../../../prisma/generated/master-client';
import { PostEntity } from '../../entity/post.entity';
import { plainToInstance } from 'class-transformer';
import { ListResponseType } from '../../../../shared/type/list-response.type';
import { PagingType } from '../../../../shared/type/paging.type';
import { PostQueryInterface } from '../../interface/post-query.interface';

@Injectable()
export class GetPostQuery implements PostQueryInterface {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async findPostsWithPaging(data: PostEntity, paging: PagingType): Promise<ListResponseType<PostEntity>> {
        const { title, writer } = data;
        const { page, perPage } = paging;

        const where = {
            ...(title && { title }),
            ...(writer && { writer })
        };

        const posts = await this.prismaMasterClientService.posts.findMany({
            where,
            skip: (page - 1) * perPage,
            take: perPage,
            orderBy: {
                postId: Prisma.SortOrder.desc
            },
            // 비밀번호 제외
            select: {
                postId: true,
                title: true,
                content: true,
                writer: true,
                createdAt: true,
                updatedAt: true
            }
        });

        const list = plainToInstance(PostEntity, posts);

        const totalCount = await this.prismaMasterClientService.posts.count({ where });

        return {
            paging: {
                page,
                perPage,
                totalCount
            },
            list
        };
    }
}
