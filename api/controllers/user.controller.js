const { encrypt, decrypt } = require('../../utils/encode');
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../../utils/message.constant');

const Model = require('../models/user.model');

const getUsers = async (req) => {
  try {
    const result = await Model.find();
    return result
  } catch (error) {
    throw error.message
  }
}


const createUser = async (req) => {
  const { username, password, name, phoneNumber, email, address } = req.body;
  const isExisting = await Model.findOne({ username: username })
  if (isExisting) {
    throw MESSAGE_ERROR.USER_EXISTING;
  }

  try {
    const db = new Model({
      username: username,
      password: password,
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      address: address
    });
    await db.save();
    return MESSAGE_SUCCESS.SUCCESS
  } catch (error) {
    throw error.message
  }
}

module.exports = {
  createUser,
  getUsers
}