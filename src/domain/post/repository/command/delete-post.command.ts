import { Injectable } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';

@Injectable()
export class DeletePostCommand {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async deletePostByIdAndPassword(post_id: number, password_hash: string): Promise<{ count: number }> {
        return this.prismaMasterClientService.posts.deleteMany({
            where: {
                post_id,
                password_hash
            }
        });
    }
}
