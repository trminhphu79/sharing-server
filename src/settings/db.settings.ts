
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const mongoString = process.env.MONGODB_URI || '';

export const initMongooes = () => {
  mongoose.connect(mongoString)
    .then(() => console.log('connected'))
    .catch(e => console.log(e));
}