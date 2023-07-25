import { PostDocument } from "../models";
import PostModel from "../models/post.model";

import mongoose, {
    DocumentDefinition,
    FilterQuery,
    QueryOptions,
    UpdateQuery,
} from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";
import { PostStatusEnum } from "../enum";

export async function createPost(
    input: DocumentDefinition<Omit<PostDocument, "createdAt" | "updatedAt">>
) {

    try {
        let user: UserDocument
        user = await UserModel.findById(input.author);
        if (!user) {
            throw new Error("Author not found.")
        }

        try {
            const payload = {
                ...input,
                status: PostStatusEnum.PENDING,
                author: {
                    name: user.name,
                    _id: user._id,
                    picture: user.picture,
                }
            }
            const post = await PostModel.create(payload);
            return post.toJSON();
        } catch (err) {
            console.log(err.message)
            throw new Error(err.message);
        }

    } catch (error) {
        throw new Error("Author not found.")
    }
}

export async function updatePostStatus(
    _id: string,
    input: UpdateQuery<PostDocument>
) {
    try {
        return PostModel.findByIdAndUpdate(_id , input);
    } catch (err) {
        throw new Error(err)
    }
}

export async function updatePost(
    query: FilterQuery<PostDocument>,
    update: UpdateQuery<PostDocument>
) {
    return PostModel.updateOne(query, update);
}