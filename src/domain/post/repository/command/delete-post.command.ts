import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { Prisma } from '../../../../../prisma/generated/master-client';

@Injectable()
export class DeletePostCommand {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async deletePostByIdAndPassword(
        post_id: number,
        password_hash: string,
        transaction?: Prisma.TransactionClient
    ): Promise<void> {
        const prisma: Prisma.TransactionClient = transaction ?? this.prismaMasterClientService;

        const { count } = await prisma.posts.deleteMany({
            where: {
                post_id,
                password_hash
            }
        });

        if (count === 0) {
            throw new NotFoundException(
                '비밀번호가 일치하지 않거나, 일치하는 게시글이 존재하지 않아 삭제할 수 없습니다'
            );
        }
    }
}
