import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentCommand } from '../repository/command/create-comment.command';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { GetCommentQuery } from '../repository/query/get-comment.query';
import { CreateCommentReplyDto } from '../dto/create-comment-reply.dto';
import { comments as CommentModel } from '../../../../prisma/generated/master-client';
import { GetCommentsDto } from '../dto/get-comments.dto';
import { ListResponseType } from '../../../shared/type/list-response.type';

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
        const { parent_id } = findCommentResult;

        // 댓글 무한 depth 방지 (추후 확장 원할때 주석처리)
        if (parent_id) {
            throw new BadRequestException('대댓글에는 댓글을 달 수 없습니다');
        }

        if (!findCommentResult) {
            throw new NotFoundException('부모 댓글을 찾을 수 없습니다');
        }

        const { comment_id, post_id } = findCommentResult;
        const comment = { post_id, parent_id: comment_id, ...dto };

        await this.createCommentCommand.createComment(comment);
    }

    async getCommentsWithPaging(postId: number, dto: GetCommentsDto): Promise<ListResponseType<CommentModel>> {
        const { page, perPage } = dto;

        return await this.getCommentQuery.findCommentsByPostIdWithPaging(postId, {
            page,
            perPage
        });
    }
}
