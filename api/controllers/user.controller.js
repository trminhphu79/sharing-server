const USER_MESSAGE = require('../../utils/constant/user.message');
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
  const isExisting = await Model.findOne({ username: username });

  if (isExisting) {
    throw USER_MESSAGE.EXISTING_USER;
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
    let result = await db.save();
    return result
  } catch (error) {
    throw error.message
  }
}

module.exports = {
  createUser,
  getUsers
}