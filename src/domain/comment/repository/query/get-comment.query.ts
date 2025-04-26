import { Injectable } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { comments as CommentModel } from '../../../../../prisma/generated/master-client';

@Injectable()
export class GetCommentQuery {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async findCommentById(comment_id: number): Promise<CommentModel> {
        return this.prismaMasterClientService.comments.findUnique({
            where: {
                comment_id
            }
        });
    }
}
