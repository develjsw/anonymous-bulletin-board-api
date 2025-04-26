export interface PostUpdateCommandInterface {
    updatePost(postId: number, password: string, data: { title?: string; content?: string }): Promise<void>;
}
