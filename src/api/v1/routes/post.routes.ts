import express from 'express';
import { pagingPostHandler } from '../controller/post.controller';


const postRoutes = express.Router();


postRoutes.post("/", pagingPostHandler)
postRoutes.patch("/:id", pagingPostHandler)
postRoutes.delete("/:id", pagingPostHandler)
postRoutes.post("/create", pagingPostHandler)

export default postRoutes