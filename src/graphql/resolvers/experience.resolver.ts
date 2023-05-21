import { Request } from "express";
import { ExperienceSchema } from "../schemas";
import { TExperienceBody } from "../types";

export const getExperience = async (req: Request) => {
  try {
    const result = await ExperienceSchema.find();
    return result
  } catch (error) {
    throw error
  }
}

export const createExperience = async (body: TExperienceBody) => {
  const db = new ExperienceSchema({
    companyName: body.companyName,
    title: body.title
  })
  try {
    const result = db.save();
    return result
  } catch (error) {
    throw error
  }
}
export const updateExperience = async (body: TExperienceBody) => {
  try {
    const _id = body._id;
    delete body._id;
    const updateData = body;
    const options = { new: true };
    const result = await ExperienceSchema.findByIdAndUpdate(
      _id, updateData, options
    )
    return result
  } catch (err) {
    throw err
  }
}

export const deleteExperience = async (body: TExperienceBody) => {
  try {
    const result = await ExperienceSchema.deleteOne({ _id: body._id })
    return result
  } catch (err) {
    throw err
  }
}

