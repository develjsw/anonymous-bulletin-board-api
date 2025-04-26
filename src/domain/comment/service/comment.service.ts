import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentCommand } from '../repository/command/create-comment.command';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { GetCommentQuery } from '../repository/query/get-comment.query';
import { CreateCommentReplyDto } from '../dto/create-comment-reply.dto';
import { GetCommentsDto } from '../dto/get-comments.dto';
import { ListResponseType } from '../../../shared/type/list-response.type';
import { CommentEntity } from '../entity/comment.entity';
import { KEYWORD_ALERT_SERVICE } from '../../keyword-alert/constant/keyword-alert.constant';
import { KeywordAlertServiceInterface } from '../../keyword-alert/interface/keyword-alert-service.interface';

@Injectable()
export class CommentService {
    constructor(
        private readonly createCommentCommand: CreateCommentCommand,
        private readonly getCommentQuery: GetCommentQuery,

        @Inject(KEYWORD_ALERT_SERVICE)
        private readonly keywordAlertService: KeywordAlertServiceInterface
    ) {}

    async createComment(postId: number, dto: CreateCommentDto): Promise<void> {
        const comment = { ...dto, postId };

        const { content, commentId } = await this.createCommentCommand.createComment(comment);

        await this.keywordAlertService.sendAlertForText(content, {
            type: 'comment',
            id: commentId
        });
    }

    async createCommentReply(parentCommentId: number, dto: CreateCommentReplyDto): Promise<void> {
        const findCommentResult: CommentEntity = await this.getCommentQuery.findCommentById(parentCommentId);

        if (!findCommentResult) {
            throw new NotFoundException('부모 댓글을 찾을 수 없습니다');
        }

        // 댓글 무한 depth 방지 (추후 확장 원할때 주석처리)
        const { parentId, commentId, postId } = findCommentResult;
        if (parentId) {
            throw new BadRequestException('대댓글에는 댓글을 달 수 없습니다');
        }

        const comment = { postId, parentId: commentId, ...dto };

        const createCommentResult: CommentEntity = await this.createCommentCommand.createComment(comment);
        const { content } = createCommentResult;

        await this.keywordAlertService.sendAlertForText(content, {
            type: 'comment',
            id: commentId
        });
    }

    async getCommentsWithPaging(postId: number, dto: GetCommentsDto): Promise<ListResponseType<CommentEntity>> {
        const { page, perPage } = dto;

        return await this.getCommentQuery.findCommentsWithPaging(postId, {
            page,
            perPage
        });
    }
}
