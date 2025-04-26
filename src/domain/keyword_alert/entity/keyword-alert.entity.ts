export class KeywordAlertEntity {
    constructor(
        public readonly keywordAlertId: number,
        public readonly writer: string,
        public readonly keyword: string
    ) {}
}
