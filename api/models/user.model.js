
const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  phoneNumber: String,
  address: String,
  username: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
})

module.exports = mongoose.model('User', dataSchema);