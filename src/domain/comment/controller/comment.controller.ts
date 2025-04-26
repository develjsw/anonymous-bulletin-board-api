import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { CreateCommentReplyDto } from '../dto/create-comment-reply.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Replies')
@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    // 대댓글 작성
    @Post(':parentId/replies')
    @ApiOperation({ summary: '대댓글 작성', description: '특정 댓글에 대댓글을 작성합니다.' })
    @ApiResponse({ status: 201, description: '대댓글 작성 성공' })
    async createCommentReply(@Param('parentId', ParseIntPipe) parentId: number, @Body() dto: CreateCommentReplyDto) {
        await this.commentService.createCommentReply(parentId, dto);
    }
}
