

import jsonwebtoken from 'jsonwebtoken'
import { UserSchema } from '../../api/models';
import { validateUser } from '../../utils/bcrypt'
import { USER_MESSAGE, JWT_MESSAGE } from '../../utils/constant'
import { RefreshTokenSchema, TProcess } from '../models/jwt.model';
import { ErrorCode, ErrorException } from '../../utils/error-handler';
import dotenv from 'dotenv'
import { Request } from 'express';
declare var process: TProcess;
dotenv.config()

export const generateToken = async (req: Request) => {
  try {
    const { username, phoneNumber, password } = req.body;
    const user = await UserSchema.findOne({ username, phoneNumber });

    if (!user) {
      throw USER_MESSAGE.USER_NOT_FOUND
    }

    if (!validateUser(password, user.password)) throw USER_MESSAGE.USER_NOT_FOUND

    let token = '';
    let refreshToken = '';

    token = `Bearer ${jsonwebtoken.sign({ user: user._id, phoneNumber: user.phoneNumber }, process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM, expiresIn: process.env.JWT_EXPIRATION_TIME })}`;
    refreshToken = `Bearer ${jsonwebtoken.sign({ user: user._id, phoneNumber: user.phoneNumber }, process.env.JWT_REFRESH_SECRET, { algorithm: process.env.JWT_ALGORITHM })}`;

    const newRefreshToken = new RefreshTokenSchema({
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

export const getRefreshToken = async (req: Request) => {
  const { refreshToken } = req.body;
  try {
    const refreshTokenModel = await RefreshTokenSchema.findOne({ token: refreshToken });

    if (!refreshTokenModel) {
      throw JWT_MESSAGE.INVALID_TOKEN
    }

    if (refreshTokenModel.expiryDate < new Date()) {
      refreshTokenModel.deleteOne({ token: refreshToken });
      throw JWT_MESSAGE.EXPRIED_TOKEN
    }

    let token = `Bearer ${jsonwebtoken.sign({ user: refreshTokenModel.user }, process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM, expiresIn: process.env.JWT_EXPIRATION_TIME })}`;
    return token
  } catch (error) {
    throw error
  }
}
