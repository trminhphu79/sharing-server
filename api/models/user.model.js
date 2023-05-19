
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { hashPassword } = require('../../utils/bcrypt');

const userSchema = new mongoose.Schema({
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

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model('User', userSchema);