import { Injectable } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { Prisma } from '../../../../../prisma/generated/master-client';
import { CountType } from '../../../../shared/type/count.type';

@Injectable()
export class UpdatePostCommand {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async updatePostByIdAndPassword(
        post_id: number,
        password_hash: string,
        data: Omit<Prisma.postsUpdateInput, 'post_id' | 'password_hash'>,
        transaction?: Prisma.TransactionClient
    ): Promise<CountType> {
        const prisma: Prisma.TransactionClient = transaction ?? this.prismaMasterClientService;

        return prisma.posts.updateMany({
            data,
            where: {
                post_id,
                password_hash
            }
        });
    }
}
