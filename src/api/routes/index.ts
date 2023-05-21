import express from 'express'
import userRoutes from "./user.route";
import projectRoutes from "./project.route";

const mainRoutes = express.Router();

mainRoutes.use('/project', projectRoutes);
mainRoutes.use('/user', userRoutes);

export default mainRoutes