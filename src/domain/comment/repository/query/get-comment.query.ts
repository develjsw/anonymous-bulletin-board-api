import { Injectable } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { comments as CommentModel, Prisma } from '../../../../../prisma/generated/master-client';
import { PagingType } from '../../../../shared/type/paging.type';
import { ListResponseType } from '../../../../shared/type/list-response.type';

@Injectable()
export class GetCommentQuery {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async findCommentById(commentId: number): Promise<CommentModel> {
        return this.prismaMasterClientService.comments.findUnique({
            where: {
                commentId
            }
        });
    }

    async findCommentsByPostIdWithPaging(postId: number, paging: PagingType): Promise<ListResponseType<CommentModel>> {
        const { page, perPage } = paging;

        const where = {
            postId,
            parentId: null // 대댓글 제외
        };

        const list: CommentModel[] = await this.prismaMasterClientService.comments.findMany({
            where,
            skip: (page - 1) * perPage,
            take: perPage,
            orderBy: {
                commentId: Prisma.SortOrder.desc
            },
            include: {
                replies: {
                    orderBy: { commentId: Prisma.SortOrder.desc }
                }
            }
        });

        const totalCount: number = await this.prismaMasterClientService.comments.count({
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
