import { Request } from "express-serve-static-core";
import { ProjectSchema } from "../models";

export const getProjectList = async (req: Request) => {
  try {
    const result = await ProjectSchema.find();
    return result
  } catch (error) {
    throw error
  }
}

export const readProject = async (req: Request) => {
  try {
    const data = await ProjectSchema.findById(req.params.id);
    return data;
  } catch (error) {
    throw error
  }
}

export const createProject = async (req: Request) => {
  const db = new ProjectSchema({
    name: req.body.name,
  })
  try {
    const dataToSave = db.save();
    return dataToSave;
  }
  catch (error) {
    throw error
  }
}

export const updateProject = async (req: Request) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await ProjectSchema.findByIdAndUpdate(
      id, updatedData, options
    )
    return result
  } catch (err) {
    throw err
  }
}

export const deleteProject = async (req: Request) => {
  try {
    const id = req.params.id;
    const data = await ProjectSchema.findByIdAndDelete(id);
    return `Document with ${data.name} has been deleted..`
  } catch (err) {
    throw err
  }
}



