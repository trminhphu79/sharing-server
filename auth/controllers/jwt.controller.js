

'use strict'

const dotenv = require('dotenv')
dotenv.config()

const jwt = require('jsonwebtoken')

const Model = require('../../api/models/user.model');

const generateAdminAccessToken = async req => {
  try {
    const result = await Model.findOne({ username: req.headers.username, password: req.headers.password });
    if (result) {
      let token = jwt.sign({ phone: req.headers.phone, fullname: req.headers.fullname }, process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM, expiresIn: process.env.JWT_EXPIRATION_TIME })
      token = `Bearer ${token}`
      return token
    } else {
      return null
    }
  } catch (error) {
    return error
  }
}


const generateAccessToken = async req => {
  try {
    const username = req.body.username
    const password = req.body.password
    const user = await Model.findOne({ username: username });
    let token = '';
    if (password === user.password) {
      token = jwt.sign({ phoneNumber: req.body.phoneNumber }, process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM, expiresIn: process.env.JWT_EXPIRATION_TIME })
      token = `Bearer ${token}`
    }
    return token
  } catch (error) {
    return error
  }
}


module.exports = {
  generateAdminAccessToken,
  generateAccessToken
}
