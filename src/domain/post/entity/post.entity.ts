export class PostEntity {
    constructor(
        public readonly postId: number,
        public readonly title: string,
        public readonly content: string,
        public readonly writer: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
