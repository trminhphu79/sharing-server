import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'
import { UserSchema } from '../api/models'
import { NextFunction, Request, Response } from 'express'
import { TProcess } from '../auth/models/jwt.model'
import { IJwtPayload } from './jwt.model'
import { DateTime } from 'luxon'
import { getResponse } from '../utils/func'
import { JWT_MESSAGE } from '../utils/constant'

declare var process: TProcess;
dotenv.config()

const jwtChecker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headers = req.headers
    const authHeader = headers.authorization
    const token = authHeader && authHeader.replace('Bearer ', '')

    if (token) {
      const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET, { algorithms: [process.env.JWT_ALGORITHM] }) as IJwtPayload;
      const user = payload.user;
      const expireIn = DateTime.fromMillis(payload.exp * 1000)
      const result = await UserSchema.findOne({ _id: user })
      const toDay = DateTime.now()

      if (toDay > expireIn) {
        res.status(401).json(getResponse(null, JWT_MESSAGE.EXPRIED_TOKEN))
      }

      if (result._id.toString() !== user) {
        res.status(401).json(getResponse(null, JWT_MESSAGE.INVALID_TOKEN))
      }

      next()
    } else {
      res.status(401).json(getResponse(null, JWT_MESSAGE.EMPTY_TOKEN))
    }
  } catch (error) {
    if (error.message == JWT_MESSAGE.JWT_EXPIRED) {
      res.status(401).json(getResponse(null, JWT_MESSAGE.EXPRIED_TOKEN))
    }
    res.status(401).json(getResponse(null, JWT_MESSAGE.EXPRIED_TOKEN))
  }
}

export default jwtChecker
