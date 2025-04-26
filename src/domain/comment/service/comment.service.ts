import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentCommand } from '../repository/command/create-comment.command';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { GetCommentQuery } from '../repository/query/get-comment.query';
import { CreateCommentReplyDto } from '../dto/create-comment-reply.dto';
import { comments as CommentModel } from '../../../../prisma/generated/master-client';
import { GetCommentsDto } from '../dto/get-comments.dto';
import { ListResponseType } from '../../../shared/type/list-response.type';
import { KeywordAlertService } from '../../keyword_alert/service/keyword-alert.service';

@Injectable()
export class CommentService {
    constructor(
        private readonly createCommentCommand: CreateCommentCommand,
        private readonly getCommentQuery: GetCommentQuery,

        // TODO : DIP 적용 필요
        private readonly keywordAlertService: KeywordAlertService
    ) {}

    async createComment(postId: number, dto: CreateCommentDto): Promise<void> {
        const comment = { ...dto, postId: postId };

        const createCommentResult: CommentModel = await this.createCommentCommand.createComment(comment);
        const { content, commentId } = createCommentResult;

        await this.keywordAlertService.sendAlertForText(content, {
            type: 'comment',
            id: commentId
        });
    }

    async createCommentReply(parentCommentId: number, dto: CreateCommentReplyDto): Promise<void> {
        const findCommentResult: CommentModel = await this.getCommentQuery.findCommentById(parentCommentId);

        if (!findCommentResult) {
            throw new NotFoundException('부모 댓글을 찾을 수 없습니다');
        }

        // 댓글 무한 depth 방지 (추후 확장 원할때 주석처리)
        const { parentId } = findCommentResult;
        if (parentId) {
            throw new BadRequestException('대댓글에는 댓글을 달 수 없습니다');
        }

        const { commentId, postId } = findCommentResult;
        const comment = { postId, parentId: commentId, ...dto };

        const createCommentResult: CommentModel = await this.createCommentCommand.createComment(comment);
        const { content } = createCommentResult;

        await this.keywordAlertService.sendAlertForText(content, {
            type: 'comment',
            id: commentId
        });
    }

    async getCommentsWithPaging(postId: number, dto: GetCommentsDto): Promise<ListResponseType<CommentModel>> {
        const { page, perPage } = dto;

        return await this.getCommentQuery.findCommentsByPostIdWithPaging(postId, {
            page,
            perPage
        });
    }
}
