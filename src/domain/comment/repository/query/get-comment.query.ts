import { Injectable } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { comments as CommentModel, Prisma } from '../../../../../prisma/generated/master-client';

@Injectable()
export class GetCommentQuery {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async findCommentById(comment_id: number, transaction?: Prisma.TransactionClient): Promise<CommentModel> {
        const prisma: Prisma.TransactionClient = transaction ?? this.prismaMasterClientService;

        return prisma.comments.findUnique({
            where: {
                comment_id
            }
        });
    }
}
