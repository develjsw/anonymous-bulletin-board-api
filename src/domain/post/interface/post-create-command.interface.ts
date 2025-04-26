import { PostEntity } from '../entity/post.entity';

export interface PostCreateCommandInterface {
    createPost(PostEntity): Promise<PostEntity>;
}
