import asyncHandler from "../middleware/asyncHandler.js";
import PostModel from "../models/Post.js";



// @desc Fetch all posts
// @route GET /api/posts
// @access Public
const getPosts = asyncHandler(async (req, res) => {
    const posts = await PostModel.find({});
    res.json(posts);
})


// @desc Fetch post by id
// @route GET /api/posts/:id
// @access Public
const getPostById = asyncHandler(async (req, res) => {
    const posts = await PostModel.findById(req.params.id).populate('author');
   if(posts) {
     return res.json(posts);
   }
    res.status(404).json({message: 'Post Not Found'});
})


export {getPosts, getPostById};