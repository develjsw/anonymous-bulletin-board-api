import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import { PostService } from './service/post.service';
import { GetPostsDto } from './dto/get-posts.dto';
import { ListResponseType } from '../../shared/type/list-response.type';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { PostEntity } from './entity/post.entity';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    // 게시글 목록 (검색, 페이징)
    @Get()
    async getPostsWithPaging(@Query() dto: GetPostsDto): Promise<ListResponseType<PostEntity>> {
        return this.postService.getPostsWithPaging(dto);
    }

    // 게시글 작성
    @Post()
    async createPost(@Body() dto: CreatePostDto): Promise<void> {
        await this.postService.createPost(dto);
    }

    // 게시글 수정 (비밀번호 확인)
    @Patch(':postId')
    async updatePost(@Param('postId', ParseIntPipe) postId: number, @Body() dto: UpdatePostDto): Promise<void> {
        await this.postService.updatePost(postId, dto);
    }

    // 게시글 삭제 (비밀번호 확인)
    @Delete(':postId')
    async deletePost(@Param('postId', ParseIntPipe) postId: number, @Body() dto: DeletePostDto): Promise<void> {
        await this.postService.deletePost(postId, dto);
    }
}
