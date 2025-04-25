import { Injectable } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { Prisma } from '../../../../../prisma/generated/master-client';

@Injectable()
export class UpdatePostCommand {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async updatePostByIdAndPassword(
        post_id: number,
        password_hash: string,
        data: Omit<Prisma.postsUpdateInput, 'post_id' | 'password_hash'>
    ): Promise<void> {
        await this.prismaMasterClientService.posts.update({
            data,
            where: {
                post_id,
                password_hash
            }
        });
    }
}
