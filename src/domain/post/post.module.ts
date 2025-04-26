import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './service/post.service';
import { GetPostQuery } from './repository/query/get-post.query';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { CreatePostCommand } from './repository/command/create-post.command';
import { UpdatePostCommand } from './repository/command/update-post.command';
import { DeletePostCommand } from './repository/command/delete-post.command';

@Module({
    imports: [PrismaModule],
    controllers: [PostController],
    providers: [PostService, GetPostQuery, CreatePostCommand, UpdatePostCommand, DeletePostCommand],
    exports: [GetPostQuery, CreatePostCommand, UpdatePostCommand, DeletePostCommand]
})
export class PostModule {}
