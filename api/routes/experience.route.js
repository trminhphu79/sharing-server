'use strict'
const express = require('express');
const routes = express.Router();
const { createExperience, getExperience, updateExperience } = require('../controllers/experience.controller');

routes
  .get('/', async (req, res) => {
    let result = await getExperience(req);
    res.status(200).json({
      value: result
    });
  })
  .post('/', async (req, res) => {
    let result = await createExperience(req);
    res.status(200).json({
      value: result
    });
  })
  .patch('/:id', async (req, res) => {
    const result = await updateExperience(req);
    res.status(200).json({
      value: result
    });
  })

module.exports = routes