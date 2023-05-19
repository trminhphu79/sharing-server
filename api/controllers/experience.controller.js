const Model = require('../models/experience.model');

const getExperience = async (req) => {
  try {
    const result = await Model.find();
    return result
  } catch (error) {
    throw error
  }
}

const createExperience = async (req) => {
  const db = new Model({
    companyName: req.body.companyName,
    title: req.body.title
  })
  try {
    const result = db.save();
    return result
  } catch (error) {
    throw error
  }
}
const updateExperience = async (req) => {
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

module.exports = {
  getExperience,
  createExperience,
  updateExperience
}