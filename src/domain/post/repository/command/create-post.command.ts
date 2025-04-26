import { Injectable } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { Prisma } from '../../../../../prisma/generated/master-client';
import { PostCreateCommandInterface } from '../../interface/post-create-command.interface';
import { PostEntity } from '../../entity/post.entity';

@Injectable()
export class CreatePostCommand implements PostCreateCommandInterface {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async createPost(data: Omit<PostEntity, 'postId'>, transaction?: Prisma.TransactionClient): Promise<PostEntity> {
        const prisma: Prisma.TransactionClient = transaction ?? this.prismaMasterClientService;

        return prisma.posts.create({
            data
        });
    }
}
