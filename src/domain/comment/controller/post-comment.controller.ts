import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentService } from '../service/comment.service';
import { GetCommentsDto } from '../dto/get-comments.dto';
import { ListResponseType } from '../../../shared/type/list-response.type';
import { CommentEntity } from '../entity/comment.entity';

@Controller('posts/:postId/comments')
export class PostCommentController {
    constructor(private readonly commentService: CommentService) {}

    // 댓글 작성
    @Post()
    async createComment(@Param('postId', ParseIntPipe) postId: number, @Body() dto: CreateCommentDto): Promise<void> {
        await this.commentService.createComment(postId, dto);
    }

    // 특정 게시글의 댓글 목록
    @Get()
    async getCommentsWithPaging(
        @Param('postId', ParseIntPipe) postId: number,
        @Query() dto: GetCommentsDto
    ): Promise<ListResponseType<CommentEntity>> {
        return await this.commentService.getCommentsWithPaging(postId, dto);
    }
}
