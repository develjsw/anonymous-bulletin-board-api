import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { Prisma } from '../../../../../prisma/generated/master-client';
import { PostDeleteCommandInterface } from '../../interface/post-delete-command.interface';

@Injectable()
export class DeletePostCommand implements PostDeleteCommandInterface {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async deletePost(postId: number, password: string, transaction?: Prisma.TransactionClient): Promise<void> {
        const prisma: Prisma.TransactionClient = transaction ?? this.prismaMasterClientService;

        const { count } = await prisma.posts.deleteMany({
            where: {
                postId,
                password
            }
        });

        if (count === 0) {
            throw new NotFoundException(
                '비밀번호가 일치하지 않거나, 일치하는 게시글이 존재하지 않아 삭제할 수 없습니다'
            );
        }
    }
}
