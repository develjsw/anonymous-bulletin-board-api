import { PostEntity } from '../entity/post.entity';
import { PagingType } from '../../../shared/type/paging.type';
import { ListResponseType } from '../../../shared/type/list-response.type';

export interface PostQueryInterface {
    findPostsWithPaging(data: PostEntity, paging: PagingType): Promise<ListResponseType<PostEntity>>;
}
