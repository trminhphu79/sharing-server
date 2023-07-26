import mongoose from "mongoose";

interface CommentDocument extends mongoose.Document {
}

const commentSchema = new mongoose.Schema({

})



const CommentModel = mongoose.model<CommentDocument>("Comments", commentSchema)

export default CommentModel