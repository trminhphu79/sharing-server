import dotenv from 'dotenv'

dotenv.config();

export const GLOBAL_SETTING = {
  VERSION: process.env.VERSION,
  NODE_ENV: process.env.NODE_ENV,
  HOSTNAME: process.env.HOSTNAME,
  PORT: process.env.PORT
}
