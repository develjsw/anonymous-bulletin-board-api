import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostService } from './service/post.service';
import { GetPostsDto } from './dto/get-posts.dto';
import { ListResponseType } from '../../shared/type/list-response.type';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { PostEntity } from './entity/post.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    // 게시글 목록 (검색, 페이징)
    @Get()
    @ApiOperation({ summary: '게시글 목록 조회', description: '검색 및 페이징을 통해 게시글 목록을 조회합니다.' })
    @ApiResponse({ status: 200, description: '게시글 목록 조회 성공' })
    async getPostsWithPaging(@Query() dto: GetPostsDto): Promise<ListResponseType<PostEntity>> {
        return this.postService.getPostsWithPaging(dto);
    }

    // 게시글 작성
    @Post()
    @ApiOperation({ summary: '게시글 작성', description: '새 게시글을 작성합니다.' })
    @ApiResponse({ status: 201, description: '게시글 작성 성공' })
    async createPost(@Body() dto: CreatePostDto): Promise<void> {
        await this.postService.createPost(dto);
    }

    // 게시글 수정 (비밀번호 확인)
    @Patch(':postId')
    @ApiOperation({ summary: '게시글 수정', description: '게시글을 수정합니다. (비밀번호 확인)' })
    @ApiResponse({ status: 200, description: '게시글 수정 성공' })
    async updatePost(@Param('postId', ParseIntPipe) postId: number, @Body() dto: UpdatePostDto): Promise<void> {
        await this.postService.updatePost(postId, dto);
    }

    // 게시글 삭제 (비밀번호 확인)
    @Delete(':postId')
    @ApiOperation({ summary: '게시글 삭제', description: '게시글을 삭제합니다. (비밀번호 확인)' })
    @ApiResponse({ status: 200, description: '게시글 삭제 성공' })
    async deletePost(@Param('postId', ParseIntPipe) postId: number, @Body() dto: DeletePostDto): Promise<void> {
        await this.postService.deletePost(postId, dto);
    }
}
