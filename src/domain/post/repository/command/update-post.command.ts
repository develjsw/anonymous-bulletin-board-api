import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { Prisma } from '../../../../../prisma/generated/master-client';

@Injectable()
export class UpdatePostCommand {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async updatePostByIdAndPassword(
        postId: number,
        password: string,
        data: Omit<Prisma.postsUpdateInput, 'postId' | 'password'>,
        transaction?: Prisma.TransactionClient
    ): Promise<void> {
        const prisma: Prisma.TransactionClient = transaction ?? this.prismaMasterClientService;

        const { count } = await prisma.posts.updateMany({
            data,
            where: {
                postId,
                password
            }
        });

        if (count === 0) {
            throw new NotFoundException(
                '비밀번호가 일치하지 않거나, 일치하는 게시글이 존재하지 않아 수정할 수 없습니다'
            );
        }
    }
}
