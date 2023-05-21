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
export const updateExperience = async (req: Request) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await ExperienceSchema.findByIdAndUpdate(
      id, updatedData, options
    )
    return result
  } catch (err) {
    throw err
  }
}

