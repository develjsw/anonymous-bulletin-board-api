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

        const { paging, list }: ListResponseType<PostModel> = await this.getPostQuery.findPostsWithPaging(post, {
            page,
            perPage
        });

        if (!list.length) {
            throw new NotFoundException('일치하는 게시글 리스트가 존재하지 않습니다');
        }

        return {
            paging,
            list
        };
    }

    async createPost(dto: CreatePostDto): Promise<void> {
        // TODO : 비밀번호 암호화 로직 필요?
        await this.createPostCommand.createPost(dto);
    }

    async updatePost(postId: number, dto: UpdatePostDto): Promise<void> {
        const { password_hash, ...post } = dto;

        const { count }: { count: number } = await this.updatePostCommand.updatePostByIdAndPassword(
            postId,
            password_hash,
            post
        );

        if (!count) {
            throw new NotFoundException(
                '비밀번호가 일치하지 않거나, 일치하는 게시글이 존재하지 않아 수정할 수 없습니다'
            );
        }
    }

    async deletePost(postId: number, dto: DeletePostDto): Promise<void> {
        const { password_hash, ...post } = dto;

        const { count }: { count: number } = await this.deletePostCommand.deletePostByIdAndPassword(
            postId,
            password_hash
        );

        if (!count) {
            throw new NotFoundException(
                '비밀번호가 일치하지 않거나, 일치하는 게시글이 존재하지 않아 삭제할 수 없습니다'
            );
        }
    }
}
