'use strict'

const dotenv = require('dotenv')
dotenv.config()

const jwt = require('jsonwebtoken')
const Model = require('../api/models/user.model');

const { DateTime } = require('luxon')

const jwtChecker = async (req, res, next) => {
  try {
    const headers = req.headers
    const authHeader = headers.authorization
    const token = authHeader && authHeader.replace('Bearer ', '')

    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM })
      const phoneNumber = payload.phoneNumber
      const expireIn = DateTime.fromMillis(payload.exp * 1000)
      const user = await Model.findOne({ phoneNumber: phoneNumber })
      const toDay = DateTime.now()

      if (toDay > expireIn) {
        res.status(401).json(new Error('Expired Token'))
      }

      if (user.phoneNumber.toString() !== phoneNumber) {
        res.status(401).json(new Error('Invalid Token'))
      }

      next()
    } else {
      res.status(401).json(new Error('Empty Token'))
    }
  } catch (error) {
    res.status(401).json(error)
  }
}

module.exports = jwtChecker
