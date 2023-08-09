import express from 'express';
import { createPostHandler, pagingPostHandler, updatePostStatusHandler, updatePostHandler } from '../controller';
import validateResource from '../../../middleware/validateResource';
import { createPostSchema, pagingPostStatusSchema, updatePostStatusSchema } from '../schema/post.schema';
import requireUser from '../../../middleware/requireUser';


const postRoutes = express.Router();

postRoutes.post("/paging", validateResource(pagingPostStatusSchema), pagingPostHandler);

postRoutes.patch("/status/:id", requireUser, validateResource(updatePostStatusSchema), updatePostStatusHandler);

postRoutes.patch("/:id", requireUser, updatePostHandler);

// postRoutes.put("/:id", requireUser, pagingPostHandler);

postRoutes.post("/create", validateResource(createPostSchema), createPostHandler);

export default postRoutes