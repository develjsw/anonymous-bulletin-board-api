import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './service/post.service';
import { GetPostQuery } from './repository/query/get-post.query';
import { PrismaModule } from '../../shared/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PostController],
    providers: [PostService, GetPostQuery],
    exports: []
})
export class PostModule {}
