import { PagingResponse } from "../api/v1/interface"

export function toResponse<T>(data: T, message: string, options?: { [key: string]: any }): { data: T, message: string } {
    return {
        data: data,
        message: message,
        ...options
    }
}

export function toPagingResponse<T>(data: PagingResponse<T>): PagingResponse<T> {
    return {
        data: data.data,
        totalPage: data.totalPage,
        currentPage: data.currentPage,
        message: data.message
    }
}