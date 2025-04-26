import { Controller, Get } from '@nestjs/common';

@Controller('posts/:pid/comments')
export class PostCommentController {
    constructor() {}

    // 특정 게시글의 댓글 목록
    @Get()
    async getComments(): Promise<void> {}
}
