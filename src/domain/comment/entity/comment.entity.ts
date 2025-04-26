export class CommentEntity {
    constructor(
        public readonly commentId: number,
        public readonly postId: number,
        public readonly parentId: number | null,
        public readonly writer: string,
        public readonly content: string,
        public readonly createdAt: Date
    ) {}
}
