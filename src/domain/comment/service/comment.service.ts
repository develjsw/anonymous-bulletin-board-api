import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentCommand } from '../repository/command/create-comment.command';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { GetCommentQuery } from '../repository/query/get-comment.query';
import { GetPostQuery } from '../../post/repository/query/get-post.query';
import { CreateCommentReplyDto } from '../dto/create-comment-reply.dto';
import { comments as CommentModel, PrismaClient } from '../../../../prisma/generated/master-client';
import { PrismaMasterClientService } from '../../../shared/prisma/service/prisma-master-client.service';

@Injectable()
export class CommentService {
    constructor(
        private readonly createCommentCommand: CreateCommentCommand,
        private readonly getCommentQuery: GetCommentQuery,

        // TODO : DIP 적용 필요
        private readonly getPostQuery: GetPostQuery,

        private readonly prismaMasterClientService: PrismaMasterClientService
    ) {}

    async createComment(postId: number, dto: CreateCommentDto): Promise<void> {
        const comment = { ...dto, post_id: postId };

        await this.createCommentCommand.createComment(comment);
    }

    async createCommentReply(parentId: number, dto: CreateCommentReplyDto): Promise<void> {
        await this.prismaMasterClientService.runInTransaction(async (prisma: PrismaClient) => {
            const findCommentResult: CommentModel = await this.getCommentQuery.findCommentById(parentId, prisma);

            if (!findCommentResult) {
                throw new NotFoundException('부모 댓글을 찾을 수 없습니다');
            }

            const { comment_id, post_id } = findCommentResult;
            const comment = { post_id, parent_id: comment_id, ...dto };

            await this.createCommentCommand.createComment(comment, prisma);
        });
    }
}
