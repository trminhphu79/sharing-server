import { object, string, TypeOf, array, number } from "zod";

export const createPostSchema = object({
    body: object({
        author: string({
            required_error: "Author is required"
        }),
        content: string({
            required_error: "Content is required"
        }),
        title: string({
            required_error: "Title is required"
        }),
        tags: string().array().nonempty("Tag is required")
    }),
});

export const updatePostStatusSchema = object({
    body: object({
        status: string({
            required_error: "Author is required"
        })
    }),
    params: object({
        id: string({
            required_error: "Id is required"
        })
    }),
})

export const pagingPostStatusSchema = object({
    body: object({
        page: number({
            required_error: "Page is required"
        }),
        limit: number({
            required_error: "Page is required"
        }),
    })
})