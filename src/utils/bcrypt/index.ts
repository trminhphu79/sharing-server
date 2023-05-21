import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
  } catch (error) {
    return ''
  }
}

export const validateUser = async (hash: any, password: string) => {
  let result = await bcrypt.compare(hash, password)
  return result
}
