import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {type: String},
    message: String,
    creator: String,
    name: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    comments: { type: [String], default: []},
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostMessage  = mongoose.model('PostMessage', postSchema);

export default PostMessage; 