import { Request } from "express";
import { USER_MESSAGE } from "../../utils/constant";
import { UserSchema } from "../models";



export const getUsers = async (req: Request) => {
  try {
    const result = await UserSchema.find();
    return result
  } catch (error: any) {
    throw error.message
  }
}

export const createUser = async (req: Request) => {

  const { username, password, name, phoneNumber, email, address } = req.body;
  const isExisting = await UserSchema.findOne({ username: username });

  if (isExisting) {
    throw USER_MESSAGE.EXISTING_USER;
  }

  try {
    const db = new UserSchema({
      username: username,
      password: password,
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      address: address
    });
    let result = await db.save();
    return result
  } catch (error: any) {
    throw error.message
  }
}
