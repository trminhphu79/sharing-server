'use strict'
const express = require('express');
const routes = express.Router();

const { createUser, getUsers } = require('../controllers/user.controller');
const { getResponse } = require('../../utils/convert.response');
const jwtChecker = require('../../middlewares/jwt.checker');

const USER_MESSAGE = require('../../utils/constant/user.message');

routes
  .get('/', jwtChecker, async (req, res) => {
    try {
      let result = await getUsers(req);
      res.status(200).json(getResponse(result));
    } catch (error) {
      res.status(400).json(getResponse(null, error))
    }
  })
  .post('/', async (req, res) => {
    try {
      await createUser(req, res);
      res.status(200).json(getResponse(null, USER_MESSAGE.CREATE_SUCCESS));
    } catch (error) {
      res.status(400).json(getResponse(null, error));
    }
  })
  .patch('/:id', async (req, res) => {
  })

module.exports = routes