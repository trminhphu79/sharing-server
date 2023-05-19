'use strict'

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const mongoString = process.env.MONGODB_URI;

mongoose.connect(mongoString)
  .then(() => console.log('connected'))
  .catch(e => console.log(e));

module.exports = mongoose
