import { Injectable, NotFoundException } from '@nestjs/common';
import { GetPostQuery } from '../repository/query/get-post.query';
import { GetPostsDto } from '../dto/get-posts.dto';
import { ListResponseType } from '../../../shared/type/list-response.type';
import { posts as PostModel } from '../../../../prisma/generated/master-client';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreatePostCommand } from '../repository/command/create-post.command';
import { UpdatePostDto } from '../dto/update-post.dto';
import { UpdatePostCommand } from '../repository/command/update-post.command';

@Injectable()
export class PostService {
    constructor(
        private readonly getPostQuery: GetPostQuery,
        private readonly createPostCommand: CreatePostCommand,
        private readonly updatePostCommand: UpdatePostCommand
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

        // TODO : 조회를 한번 더 호출하고 진행할지, 아니면 수정을 바로 진행하되 일치하는 데이터 없을 때(=P2025 Error) 404 Error 처리할지 결정 필요

        await this.updatePostCommand.updatePostByIdAndPassword(postId, password_hash, post);
    }
}
