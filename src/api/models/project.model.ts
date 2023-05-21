
import mongoose from 'mongoose'
const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
})

export const ProjectSchema = mongoose.model('Project', dataSchema);
