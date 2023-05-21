import express from 'express';
import { generateToken, getRefreshToken } from '../controllers/jwt.controller'
import { getResponse } from '../../utils/func';


const authRoutes = express.Router();

authRoutes
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

export default authRoutes