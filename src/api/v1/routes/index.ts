import express from 'express'
import sessionRoutes from './session.routes';
import userRoutes from './user.routes';

const mainRoutes = express.Router();

mainRoutes.use('/v1/sessions', sessionRoutes);
mainRoutes.use('/v1', userRoutes);

export default mainRoutes