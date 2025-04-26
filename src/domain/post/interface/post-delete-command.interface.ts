export interface PostDeleteCommandInterface {
    deletePost(postId: number, password: string): Promise<void>;
}
