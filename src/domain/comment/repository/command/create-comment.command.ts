import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { Prisma } from '../../../../../prisma/generated/master-client';
import { CommentCreateCommandInterface } from '../../interface/comment-create-command.interface';
import { CommentEntity } from '../../entity/comment.entity';

@Injectable()
export class CreateCommentCommand implements CommentCreateCommandInterface {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async createComment(
        data: {
            postId: number;
            writer: string;
            content: string;
        },
        transaction?: Prisma.TransactionClient
    ): Promise<CommentEntity> {
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
