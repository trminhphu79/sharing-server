'use strict'
const express = require('express');
const routes = express.Router();
const { getProjectList, readProject, createProject, updateProject, deleteProject } = require('../controllers/project.controller');

routes
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
    console.log(req.body)
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
      value: result
    })
  })

module.exports = routes;
