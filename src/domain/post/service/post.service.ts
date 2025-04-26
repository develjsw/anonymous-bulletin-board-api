import { Inject, Injectable } from '@nestjs/common';
import { GetPostQuery } from '../repository/query/get-post.query';
import { GetPostsDto } from '../dto/get-posts.dto';
import { ListResponseType } from '../../../shared/type/list-response.type';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreatePostCommand } from '../repository/command/create-post.command';
import { UpdatePostDto } from '../dto/update-post.dto';
import { UpdatePostCommand } from '../repository/command/update-post.command';
import { DeletePostDto } from '../dto/delete-post.dto';
import { DeletePostCommand } from '../repository/command/delete-post.command';
import { PostEntity } from '../entity/post.entity';
import { plainToInstance } from 'class-transformer';
import { KEYWORD_ALERT_SERVICE } from '../../keyword-alert/constant/keyword-alert.constant';
import { KeywordAlertServiceInterface } from '../../keyword-alert/interface/keyword-alert-service.interface';

@Injectable()
export class PostService {
    constructor(
        private readonly getPostQuery: GetPostQuery,
        private readonly createPostCommand: CreatePostCommand,
        private readonly updatePostCommand: UpdatePostCommand,
        private readonly deletePostCommand: DeletePostCommand,

        @Inject(KEYWORD_ALERT_SERVICE)
        private readonly keywordAlertService: KeywordAlertServiceInterface
    ) {}

    async getPostsWithPaging(dto: GetPostsDto): Promise<ListResponseType<PostEntity>> {
        const { page, perPage, ...post } = dto;

        return await this.getPostQuery.findPostsWithPaging(plainToInstance(PostEntity, post), {
            page,
            perPage
        });
    }

    async createPost(dto: CreatePostDto): Promise<void> {
        const createPostResult: PostEntity = await this.createPostCommand.createPost(plainToInstance(PostEntity, dto));
        const { postId, title, content } = createPostResult;

        // 키워드 알림 등록
        const text = `${title}\n${content}`;
        await this.keywordAlertService.sendAlertForText(text, {
            type: 'post',
            id: postId
        });
    }

    async updatePost(postId: number, dto: UpdatePostDto): Promise<void> {
        const { password, ...post } = dto;

        await this.updatePostCommand.updatePost(postId, password, post);
    }

    async deletePost(postId: number, dto: DeletePostDto): Promise<void> {
        const { password } = dto;

        await this.deletePostCommand.deletePost(postId, password);
    }
}
