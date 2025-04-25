import { Injectable } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { CountType } from '../../../../shared/type/count.type';

@Injectable()
export class DeletePostCommand {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async deletePostByIdAndPassword(post_id: number, password_hash: string): Promise<CountType> {
        return this.prismaMasterClientService.posts.deleteMany({
            where: {
                post_id,
                password_hash
            }
        });
    }
}
