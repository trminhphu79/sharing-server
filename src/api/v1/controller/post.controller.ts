import { Request, Response } from "express";
import { createPost, updatePost, updatePostStatus } from "../service";
import logger from "../../../utils/logger";
import { toResponse } from "../../../utils/http";
import { MessageResponse } from "utils/message";

export async function pagingPostHandler(req: Request, res: Response) {
    res.status(204).send({})
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
        toResponse
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