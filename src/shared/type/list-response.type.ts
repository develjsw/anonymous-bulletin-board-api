export type ListResponseType<T> = {
    paging: {
        page: number;
        perPage: number;
        totalCount: number;
    };
    list: T[];
};
