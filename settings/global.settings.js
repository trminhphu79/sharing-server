'use strict'


const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  VERSION: process.env.VERSION,
  NODE_ENV: process.env.NODE_ENV,
  HOSTNAME: process.env.HOSTNAME,
  PORT: process.env.PORT
}
