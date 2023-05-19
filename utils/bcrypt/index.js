const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
  } catch (error) {
    return false
  }
}

const validateUser = async (hash, password) => {
  let result = await bcrypt.compare(hash, password)
    return result
}

module.exports = {
  validateUser,
  hashPassword
}