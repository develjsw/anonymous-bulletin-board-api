import { Injectable } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { Prisma } from '../../../../../prisma/generated/master-client';

@Injectable()
export class CreatePostCommand {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async createPost(
        data: Omit<Prisma.postsCreateInput, 'post_id'>,
        transaction?: Prisma.TransactionClient
    ): Promise<void> {
        const prisma: Prisma.TransactionClient = transaction ?? this.prismaMasterClientService;

        await prisma.posts.create({
            data
        });
    }
}
