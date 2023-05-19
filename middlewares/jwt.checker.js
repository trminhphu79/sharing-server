'use strict'

const dotenv = require('dotenv')
dotenv.config()

const jwt = require('jsonwebtoken')
const Model = require('../api/models/user.model');

const { DateTime } = require('luxon');
const { getResponse } = require('../utils/convert.response');
const JWT_MESSAGE = require('../utils/constant/jwt.message');

const jwtChecker = async (req, res, next) => {
  try {
    const headers = req.headers
    const authHeader = headers.authorization
    const token = authHeader && authHeader.replace('Bearer ', '')

    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM });
      const user = payload.user;
      const expireIn = DateTime.fromMillis(payload.exp * 1000)
      const result = await Model.findOne({ _id: user })
      const toDay = DateTime.now()

      if (toDay > expireIn) {
        res.status(401).json(getResponse(null, JWT_MESSAGE.EXPRIED_TOKEN))
      }

      if (result._id.toString() !== user) {
        res.status(401).json(getResponse(null, JWT_MESSAGE.INVALID_TOKEN))
      }

      next()
    } else {
      res.status(401).json(getResponse(null,JWT_MESSAGE.EMPTY_TOKEN))
    }
  } catch (error) {
    if (error.message == JWT_MESSAGE.JWT_EXPIRED) {
      res.status(401).json(getResponse(null, JWT_MESSAGE.EXPRIED_TOKEN))
    }
    res.status(401).json(error.message)
  }
}

module.exports = jwtChecker
