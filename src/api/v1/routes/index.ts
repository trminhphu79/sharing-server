import express from 'express'
import sessionRoutes from './session.routes';
import userRoutes from './user.routes';
import postRoutes from './post.routes';

const mainRoutes = express.Router();

mainRoutes.use('/v1/sessions', sessionRoutes);
mainRoutes.use('/v1', userRoutes);
mainRoutes.use('/v1/post', postRoutes)

export default mainRoutes