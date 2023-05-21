import { Algorithm } from 'jsonwebtoken';
import mongoose from 'mongoose'

export const RefreshTokenSchema = mongoose.model('RefreshToken', new mongoose.Schema({
  token: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  expiryDate: { type: Date, required: true },
}));

export type TProcess = {
  env: {
    JWT_SECRET: string,
    JWT_REFRESH_SECRET: string,
    JWT_ALGORITHM: Algorithm | undefined,
    JWT_EXPIRATION_TIME: string | number
  }
}