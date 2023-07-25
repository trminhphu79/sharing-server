import { CookieOptions, Request, Response } from "express";
import { createPost, updatePost, updatePostStatus } from "../service";
import { PostMessage } from '../enum'
import logger from "../../../utils/logger";
import mongoose from "mongoose";
import { toResponse } from "../../../utils/http";

export async function pagingPostHandler(req: Request, res: Response) {
    res.status(204).send({})
}

export async function createPostHandler(req: Request, res: Response) {
    try {
        const result = await createPost(req.body);
        return res.send(result)
    } catch (error) {
        logger.error(error);
        return res.status(400).send(error.message);
    }
}

export async function updatePostStatusHandler(req: Request, res: Response) {
    try {
        const result = await updatePostStatus(req.params['id'], req.body);
        toResponse
        return res.send(toResponse(result._id, PostMessage.UPDATE_STATUS_SUCCESS))
    } catch (error) {
        logger.error(error);
        return res.status(400).send(error.message);
    }
}

export async function updatePostHandler(req: Request, res: Response) {
    try {
        const result = await updatePost({ _id: req.params['id'] }, { ...req.body });
        return res.send(toResponse<any>(null, PostMessage.UPDATE_STATUS_SUCCESS))
    } catch (error) {
        logger.error(error);
        return res.status(400).send(error.message);
    }
}