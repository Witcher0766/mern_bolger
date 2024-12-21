import mongoose from "mongoose";


const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    author: {
        _id: mongoose.Schema.Types.ObjectId,
        username: String,
        email: String,
    }
}, {
    timestamps: true,
});

const PostModel = mongoose.model("Post", PostSchema);


export default PostModel;