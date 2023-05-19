const Model = require('../models/project.model');

const getProjectList = async (req) => {
  try {
    const result = await Model.find();
    return result
  } catch (error) {
    throw error
  }
}

const readProject = async (req) => {
  try {
    const data = await Model.findById(req.params.id);
    return data;
  } catch (error) {
    throw error
  }
}

const createProject = async (req) => {
  const db = new Model({
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

const updateProject = async (req) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(
      id, updatedData, options
    )
    return result
  } catch (err) {
    throw err
  }
}

const deleteProject = async (req) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    return `Document with ${data.name} has been deleted..`
  } catch (err) {
    throw err
  }
}

module.exports = {
  getProjectList,
  readProject,
  createProject,
  updateProject,
  deleteProject
}

