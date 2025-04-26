import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentCommand } from '../repository/command/create-comment.command';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { GetCommentQuery } from '../repository/query/get-comment.query';
import { CreateCommentReplyDto } from '../dto/create-comment-reply.dto';
import { comments as CommentModel } from '../../../../prisma/generated/master-client';

@Injectable()
export class CommentService {
    constructor(
        private readonly createCommentCommand: CreateCommentCommand,
        private readonly getCommentQuery: GetCommentQuery
    ) {}

    async createComment(postId: number, dto: CreateCommentDto): Promise<void> {
        const comment = { ...dto, post_id: postId };

        await this.createCommentCommand.createComment(comment);
    }

    async createCommentReply(parentId: number, dto: CreateCommentReplyDto): Promise<void> {
        const findCommentResult: CommentModel = await this.getCommentQuery.findCommentById(parentId);

        if (!findCommentResult) {
            throw new NotFoundException('부모 댓글을 찾을 수 없습니다');
        }

        const { comment_id, post_id } = findCommentResult;
        const comment = { post_id, parent_id: comment_id, ...dto };

        await this.createCommentCommand.createComment(comment);
    }
}
