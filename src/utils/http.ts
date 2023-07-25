export function toResponse<T>(data: T, message: string): { data: T, message: string } {
    return {
        data: data,
        message: message
    }
}