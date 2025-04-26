import { Injectable } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { posts as PostModel, Prisma } from '../../../../../prisma/generated/master-client';

@Injectable()
export class CreatePostCommand {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async createPost(
        data: Omit<Prisma.postsCreateInput, 'post_id'>,
        transaction?: Prisma.TransactionClient
    ): Promise<PostModel> {
        const prisma: Prisma.TransactionClient = transaction ?? this.prismaMasterClientService;

        return prisma.posts.create({
            data
        });
    }
}
