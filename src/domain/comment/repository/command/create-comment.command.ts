import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { comments as CommentModel, Prisma } from '../../../../../prisma/generated/master-client';

@Injectable()
export class CreateCommentCommand {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async createComment(
        data: Omit<Prisma.commentsUncheckedCreateInput, 'commentId'>,
        transaction?: Prisma.TransactionClient
    ): Promise<CommentModel> {
        const prisma: Prisma.TransactionClient = transaction ?? this.prismaMasterClientService;

        try {
            return prisma.comments.create({
                data
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                (error.code === 'P2025' || error.code === 'P2003')
            ) {
                throw new NotFoundException('게시글 또는 부모 댓글을 찾을 수 없습니다');
            }
            throw error;
        }
    }
}
