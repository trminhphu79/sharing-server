'use strict'

import { Request, Response } from "express";

import express from 'express'
import { createUser, getUsers } from '../controllers/user.controller'
import { getResponse } from "../../utils/func";
import { USER_MESSAGE } from "../../utils/constant";
import jwtChecker from "../../middlewares/jwt.checker";

const userRoutes = express.Router();

userRoutes
  .get('/', jwtChecker, async (req: Request, res: Response) => {
    try {
      let result = await getUsers(req);
      res.status(200).json(getResponse(result));
    } catch (error) {
      res.status(400).json(getResponse(null, error))
    }
  })
  .post('/', async (req: Request, res: Response) => {
    try {
      await createUser(req);
      res.status(200).json(getResponse(null, USER_MESSAGE.CREATE_SUCCESS));
    } catch (error) {
      res.status(400).json(getResponse(null, error));
    }
  })
  .patch('/:id', async (req: Request, res: Response) => {
  })

export default userRoutes