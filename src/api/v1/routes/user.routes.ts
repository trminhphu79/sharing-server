import express from 'express'
import requireUser from '../../../middleware/requireUser';
import validateResource from '../../../middleware/validateResource';
import { createUserHandler, getCurrentUser } from '../controller/user.controller';
import { createUserSchema } from '../schema/user.schema';

const userRoutes = express.Router();

userRoutes.post("/users", validateResource(createUserSchema), createUserHandler);

userRoutes.get("/me", requireUser, getCurrentUser);

export default userRoutes