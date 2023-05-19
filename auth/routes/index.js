'use strict'

const express = require('express');
const routes = express.Router();

const { generateAccessToken } = require('../controllers/jwt.controller');
const { getResponse } = require('../../utils/convert.response');

routes
  .post('/login', async (req, res) => {
    try {
      const token = await generateAccessToken(req);
      res.status(200).json({
        token: token
      })
    } catch (error) {
      res.status(400).json(getResponse(null, error))
    }
  })

module.exports = routes