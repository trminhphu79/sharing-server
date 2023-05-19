'use strict'

const express = require('express');
const routes = express.Router();

const { generateToken, getRefreshToken } = require('../controllers/jwt.controller');
const { getResponse } = require('../../utils/convert.response');

routes
  .post('/login', async (req, res) => {
    try {
      const result = await generateToken(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(getResponse(null, error))
    }
  })
  .post('/refreshToken', async (req, res) => {
    try {
      let result = await getRefreshToken(req);
      res.status(200).json(getResponse(result))
    } catch (error) {
      res.status(401).json(getResponse(null, error))
    }
  })

module.exports = routes