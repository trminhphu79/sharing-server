
const mongoose = require('mongoose');
const experienceSchema = new mongoose.Schema({
  companyName: {
    required: true,
    type: String
  },
  title: {
    required: true,
    type: String,
  }
})

module.exports = mongoose.model('Experience', experienceSchema);