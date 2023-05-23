import { Request } from "express";
import { ExperienceSchema } from "../schemas";
import { TExperienceBody, TExperienceFilter } from "../types";


const getExperienceList = async (filter: TExperienceFilter) => {
  try {
    const result = await ExperienceSchema.find(filter);
    return result
  } catch (error) {
    throw error
  }
}
const getExperience = async (_id: string) => {
  try {
    const result = await ExperienceSchema.findOne({ _id: _id });
    return result
  } catch (error) {
    throw error
  }
}

const createExperience = async (body: Partial<TExperienceBody>) => {
  try {
    const db = new ExperienceSchema({
      companyName: body.companyName,
      title: body.title
    })
    const result = db.save();
    return result
  } catch (error) {
    throw error
  }
}
const updateExperience = async (body: Partial<TExperienceBody>) => {
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

const deleteExperience = async (body: Partial<TExperienceBody>) => {
  try {
    const result = await ExperienceSchema.deleteOne({ _id: body._id })
    return result
  } catch (err) {
    throw err
  }
}

export const EXPERIENCE_RESOLVER = {
  getExperienceList: async (args: any) => {
    const result = await getExperienceList(args)
    return result
  },
  getExperience: async (args: { _id: string }) => {
    const result = await getExperience(args._id)
    return result
  },
  createExperience: async (args: TExperienceBody) => {
    const result = await createExperience(args)
    return result
  },
  updateExperience: async (args: TExperienceBody) => {
    const result = await updateExperience(args)
    return result
  },
  deleteExperience: async (args: TExperienceBody) => {
    const result = await deleteExperience(args)
    return result
  }
}