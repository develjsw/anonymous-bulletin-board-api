import { CommentEntity } from '../entity/comment.entity';

export interface CommentCreateCommandInterface {
    createComment(data: { postId: number; writer: string; content: string }): Promise<CommentEntity>;
}
