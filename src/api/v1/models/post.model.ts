import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface PostDocument extends mongoose.Document {
    author: Pick<UserDocument, "_id" | "name" | "picture">
    status: string,
    content: string,
    title: string,
    reactions: { [key: string]: number },
    tags: string[],
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new mongoose.Schema(
    {
        author: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            name: String,
            picture: String
        },
        content: {
            type: String,
            required: true
        },
        status: { type: String },
        title: {
            type: String,
            required: true
        },
        reactions: {
            like: {
                type: Number,
                default: 0
            },
            love: {
                type: Number,
                default: 0
            },
            wow: {
                type: Number,
                default: 0
            },
            angry: {
                type: Number,
                default: 0
            }
        },
        tags: {
            type: [String],
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const PostModel = mongoose.model<PostDocument>("Posts", postSchema);

export default PostModel;