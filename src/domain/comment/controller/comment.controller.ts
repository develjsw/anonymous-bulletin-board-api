import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { CreateCommentReplyDto } from '../dto/create-comment-reply.dto';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    // 대댓글 작성
    @Post(':parentId/replies')
    async createCommentReply(@Param('parentId', ParseIntPipe) parentId: number, @Body() dto: CreateCommentReplyDto) {
        await this.commentService.createCommentReply(parentId, dto);
    }
}
