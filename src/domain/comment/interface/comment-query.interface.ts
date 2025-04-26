import { CommentEntity } from '../entity/comment.entity';
import { PagingType } from '../../../shared/type/paging.type';
import { ListResponseType } from '../../../shared/type/list-response.type';

export interface CommentQueryInterface {
    findCommentById(commentId: number): Promise<CommentEntity>;

    findCommentsWithPaging(postId: number, paging: PagingType): Promise<ListResponseType<CommentEntity>>;
}
