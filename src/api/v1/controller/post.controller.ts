import { Request, Response } from "express";
import { createPost, pagingPost, updatePost, updatePostStatus } from "../service";
import logger from "../../../utils/logger";
import { toPagingResponse, toResponse } from "../../../utils/http";
import { MessageResponse } from "../../../utils/message";
import { PostDocument } from "../models";

export async function pagingPostHandler(req: Request, res: Response) {
    try {
        const result = await pagingPost({ page: req.body.paging, limit: req.body.limit }, req.body);
        return res.send(toPagingResponse({
            data: result.data,
            currentPage: result.currentPage,
            totalPage: result.totalPage,
            message: MessageResponse.PAGING_SUCCESS
        }));
    } catch (err) {
        return res.status(400).send(toResponse(null, MessageResponse.PAGING_FAILED));
    }
}

export async function createPostHandler(req: Request, res: Response) {
    try {
        const result = await createPost(req.body);
        return res.send(toResponse(result, MessageResponse.CREATE_SUCCESS))
    } catch (error) {
        logger.error(error);
        return res.status(400).send(toResponse(null, MessageResponse.CREATE_FAILED));
    }
}

export async function updatePostStatusHandler(req: Request, res: Response) {
    try {
        const result = await updatePostStatus(req.params['id'], req.body);
        return res.send(toResponse(result._id, MessageResponse.UPDATE_SUCCESS))
    } catch (error) {
        logger.error(error);
        return res.status(400).send(toResponse(null, MessageResponse.UPDATE_FAILED));
    }
}

export async function updatePostHandler(req: Request, res: Response) {
    try {
        const result = await updatePost({ _id: req.params['id'] }, { ...req.body });
        return res.send(toResponse<any>(null, MessageResponse.UPDATE_SUCCESS))
    } catch (error) {
        logger.error(error);
        return res.status(400).send(toResponse(null, MessageResponse.UPDATE_FAILED));
    }
}