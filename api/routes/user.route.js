'use strict'
const express = require('express');
const routes = express.Router();
const { createUser, getUsers } = require('../controllers/user.controller');
routes
  .get('/', async (req, res) => {
    let result = await getUsers(req);
    res.status(200).json({
      value: result
    })
  })
  .post('/', async (req, res) => {
    try {
      let result = await createUser(req, res);
      res.status(200).json({
        value: result
      })
    } catch (error) {
      res.status(400).json(error);
    }
  })
  .patch('/:id', async (req, res) => {
    // const result = await updateExperience(req);
    // res.status(200).json(result);
  })

module.exports = routes