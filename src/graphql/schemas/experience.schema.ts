import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  companyName: {
    required: true,
    type: String
  },
  title: {
    required: true,
    type: String,
  }
})

export const ExperienceSchema = mongoose.model('Experience', schema)