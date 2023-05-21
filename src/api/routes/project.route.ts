import express from 'express'
import { getProjectList, readProject, createProject, updateProject, deleteProject } from '../controllers/project.controller'

const projectRoutes = express.Router();
projectRoutes
  .get('/', async (req, res) => {
    const result = await getProjectList(req);
    res.status(200).json({
      value: result
    });
  })
  .get('/:id', async (req, res) => {
    const result = await readProject(req);
    res.status(200).json({
      value: result
    })
  })
  .post('/', async (req, res) => {
    const result = await createProject(req);
    res.status(200).json({
      value: result
    })
  })
  .patch('/:id', async (req, res) => {
    const result = await updateProject(req);
    res.status(200).json({
      value: result
    })
  })
  .delete("/:id", async (req, res) => {
    const reuslt = await deleteProject(req);
    res.status(200).json({
      value: reuslt
    })
  })

export default projectRoutes