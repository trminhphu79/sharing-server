export interface PayloadPaging {
    page: number;
    limit: number
}

export interface PagingResponse<T> {
    data: T;
    totalPage: number;
    currentPage: number;
    message: string;
}