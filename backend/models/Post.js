import mongoose from "mongoose";


const PostSchema = mongoose.Schema({
    title: {
        type: String,
    },
    summary: {
        type: String,
    },
    content: {
        type: String,
    },
    cover: {
        type: String,
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