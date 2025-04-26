import { Injectable, NotFoundException } from '@nestjs/common';
import { GetPostQuery } from '../repository/query/get-post.query';
import { GetPostsDto } from '../dto/get-posts.dto';
import { ListResponseType } from '../../../shared/type/list-response.type';
import { posts as PostModel } from '../../../../prisma/generated/master-client';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreatePostCommand } from '../repository/command/create-post.command';
import { UpdatePostDto } from '../dto/update-post.dto';
import { UpdatePostCommand } from '../repository/command/update-post.command';
import { DeletePostDto } from '../dto/delete-post.dto';
import { DeletePostCommand } from '../repository/command/delete-post.command';

@Injectable()
export class PostService {
    constructor(
        private readonly getPostQuery: GetPostQuery,
        private readonly createPostCommand: CreatePostCommand,
        private readonly updatePostCommand: UpdatePostCommand,
        private readonly deletePostCommand: DeletePostCommand
    ) {}

    async getPostsWithPaging(dto: GetPostsDto): Promise<ListResponseType<PostModel>> {
        const { page, perPage, ...post } = dto;

        return await this.getPostQuery.findPostsByConditionsWithPaging(post, {
            page,
            perPage
        });
    }

    async createPost(dto: CreatePostDto): Promise<void> {
        // TODO : 비밀번호 암호화 로직 필요?
        await this.createPostCommand.createPost(dto);
    }

    async updatePost(postId: number, dto: UpdatePostDto): Promise<void> {
        const { password_hash, ...post } = dto;

        await this.updatePostCommand.updatePostByIdAndPassword(postId, password_hash, post);
    }

    async deletePost(postId: number, dto: DeletePostDto): Promise<void> {
        const { password_hash } = dto;

        await this.deletePostCommand.deletePostByIdAndPassword(postId, password_hash);
    }
}
