'use strict'

const express = require('express');
const routes = express.Router();

const { generateAccessToken } = require('../controllers/jwt.controller');
routes
  .post('/login', async (req, res) => {
    const token = await generateAccessToken(req);
    res.status(200).json({
      accessToken: token,
    })
  })

module.exports = routes