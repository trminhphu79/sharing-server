const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  phone: {
    required: false,
    type: String
  },
  fullname: {
    required: false,
    type: String
  }
})

module.exports = mongoose.model('Admin', dataSchema);