import { Injectable } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { Prisma, posts as PostModel } from '../../../../../prisma/generated/master-client';
import { ListResponseType } from '../../../../shared/type/list-response.type';
import { PagingType } from '../../../../shared/type/paging.type';

@Injectable()
export class GetPostQuery {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async findPostsWithPaging(data: Prisma.postsWhereInput, paging: PagingType): Promise<ListResponseType<PostModel>> {
        const { title, writer } = data;
        const { page, perPage } = paging;

        const where = {
            ...(title && { title }),
            ...(writer && { writer })
        };

        const list: PostModel[] = await this.prismaMasterClientService.posts.findMany({
            where,
            skip: (page - 1) * perPage,
            take: perPage,
            orderBy: {
                post_id: Prisma.SortOrder.desc
            }
        });

        const totalCount: number = await this.prismaMasterClientService.posts.count({
            where
        });

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
