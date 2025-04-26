import { Module } from '@nestjs/common';
import { CommentController } from './controller/comment.controller';
import { PostCommentController } from './controller/post-comment.controller';
import { CommentService } from './service/comment.service';
import { GetCommentQuery } from './repository/query/get-comment.query';
import { CreateCommentCommand } from './repository/command/create-comment.command';

@Module({
    imports: [],
    controllers: [CommentController, PostCommentController],
    providers: [CommentService, GetCommentQuery, CreateCommentCommand],
    exports: []
})
export class CommentModule {}
