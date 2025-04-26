import { Injectable } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { CountType } from '../../../../shared/type/count.type';
import { Prisma } from '../../../../../prisma/generated/master-client';

@Injectable()
export class DeletePostCommand {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async deletePostByIdAndPassword(
        post_id: number,
        password_hash: string,
        transaction?: Prisma.TransactionClient
    ): Promise<CountType> {
        const prisma: Prisma.TransactionClient = transaction ?? this.prismaMasterClientService;

        return prisma.posts.deleteMany({
            where: {
                post_id,
                password_hash
            }
        });
    }
}
