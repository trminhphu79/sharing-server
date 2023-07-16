import express from 'express'
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler, googleOauthHandler } from '../controller/session.controller';
import requireUser from '../../../middleware/requireUser';
import validateResource from '../../../middleware/validateResource';
import { createSessionSchema } from '../schema/session.schema';

const sessionRoutes = express.Router();

sessionRoutes.post(
    "/",
    validateResource(createSessionSchema),
    createUserSessionHandler
);

sessionRoutes.get("/", requireUser, getUserSessionsHandler);

sessionRoutes.delete("/", requireUser, deleteSessionHandler);

sessionRoutes.get("/oauth/google", googleOauthHandler);

export default sessionRoutes