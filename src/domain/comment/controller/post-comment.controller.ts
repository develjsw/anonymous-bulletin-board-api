import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentService } from '../service/comment.service';

@Controller('posts/:pid/comments')
export class PostCommentController {
    constructor(private readonly commentService: CommentService) {}

    // 댓글 작성
    @Post()
    async createComment(@Param('pid', ParseIntPipe) postId: number, @Body() dto: CreateCommentDto): Promise<void> {
        await this.commentService.createComment(postId, dto);
    }

    // 특정 게시글의 댓글 목록
    @Get()
    async getComments(): Promise<void> {}
}
