import { Controller, Post } from '@nestjs/common';

@Controller('comments')
export class CommentController {
    constructor() {}

    // 댓글/대댓글 작성
    @Post()
    async createComment(): Promise<void> {}
}
