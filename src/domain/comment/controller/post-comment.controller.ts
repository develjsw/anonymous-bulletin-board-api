import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentService } from '../service/comment.service';
import { GetCommentsDto } from '../dto/get-comments.dto';
import { ListResponseType } from '../../../shared/type/list-response.type';
import { CommentEntity } from '../entity/comment.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('posts/:postId/comments')
export class PostCommentController {
    constructor(private readonly commentService: CommentService) {}

    // 댓글 작성
    @Post()
    @ApiOperation({ summary: '댓글 작성', description: '특정 게시글에 댓글을 작성합니다.' })
    @ApiResponse({ status: 201, description: '댓글 작성 성공' })
    async createComment(@Param('postId', ParseIntPipe) postId: number, @Body() dto: CreateCommentDto): Promise<void> {
        await this.commentService.createComment(postId, dto);
    }

    // 특정 게시글의 댓글 목록
    @Get()
    @ApiOperation({ summary: '댓글 목록 조회', description: '특정 게시글에 달린 댓글 목록을 페이징하여 조회합니다.' })
    @ApiResponse({ status: 200, description: '댓글 목록 조회 성공', type: [CommentEntity] })
    async getCommentsWithPaging(
        @Param('postId', ParseIntPipe) postId: number,
        @Query() dto: GetCommentsDto
    ): Promise<ListResponseType<CommentEntity>> {
        return await this.commentService.getCommentsWithPaging(postId, dto);
    }
}
