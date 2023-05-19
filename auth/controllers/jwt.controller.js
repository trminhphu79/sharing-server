

'use strict'
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')
dotenv.config()

const User = require('../../api/models/user.model');
const RefreshToken = require('../models/jwt.model');
const { validateUser } = require('../../utils/bcrypt')
const USER_MESSAGE = require('../../utils/constant/user.message');
const JWT_MESSAGE = require('../../utils/constant/jwt.message');

const generateToken = async req => {
  try {
    const { username, phoneNumber, password } = req.body;
    const user = await User.findOne({ username, phoneNumber });

    if (!user) {
      throw USER_MESSAGE.USER_NOT_FOUND
    }

    if (!validateUser(password, user.password)) throw USER_MESSAGE.USER_NOT_FOUND

    let token = '';
    let refreshToken = '';

    token = `Bearer ${jwt.sign({ user: user._id }, process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM, expiresIn: process.env.JWT_EXPIRATION_TIME })}`;
    refreshToken = `Bearer ${jwt.sign({ user: user._id }, process.env.JWT_REFRESH_SECRET, { algorithm: process.env.JWT_ALGORITHM })}`;

    const newRefreshToken = new RefreshToken({
      token: refreshToken,
      user: user._id,
      expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    await newRefreshToken.save();
    return {
      token: token,
      refreshToken: refreshToken
    }
  } catch (error) {
    throw error
  }
}

const getRefreshToken = async (req) => {
  const { refreshToken } = req.body;
  try {
    const refreshTokenModel = await RefreshToken.findOne({ token: refreshToken });

    if (!refreshTokenModel) {
      refreshTokenModel.deleteOne({ token: refreshToken });
      throw JWT_MESSAGE.INVALID_TOKEN
    }

    if (refreshTokenModel.expiryDate < new Date()) {
      throw JWT_MESSAGE.EXPRIED_TOKEN
    }

    let token = `Bearer ${jwt.sign({ user: refreshTokenModel.user }, process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM, expiresIn: process.env.JWT_EXPIRATION_TIME })}`;
    return token
  } catch (error) {
    throw error
  }
}

module.exports = {
  generateToken,
  getRefreshToken
}
