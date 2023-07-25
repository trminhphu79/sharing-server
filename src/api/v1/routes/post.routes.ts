import express from 'express';
import { createPostHandler, pagingPostHandler, updatePostStatusHandler, updatePostHandler } from '../controller';
import validateResource from '../../../middleware/validateResource';
import { createPostSchema, updatePostStatusSchema } from '../schema/post.schema';


const postRoutes = express.Router();

postRoutes.post("/list", pagingPostHandler);

postRoutes.patch("/status/:id", validateResource(updatePostStatusSchema), updatePostStatusHandler);

postRoutes.patch("/:id", updatePostHandler);

postRoutes.put("/:id", pagingPostHandler);

postRoutes.post("/create", validateResource(createPostSchema), createPostHandler);

export default postRoutes