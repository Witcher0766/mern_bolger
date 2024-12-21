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



// @desc create a posts
// @route POST /api/posts
// @access PRIVATE/users
const createPost = asyncHandler(async (req, res) => {
  const { title, summary, content, cover } = req.body;
  console.log("req.body", req.body);
  if (!title || !summary || !content || !cover) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const post = new PostModel({
    title,
    summary,
    content,
    cover,
    author: { 
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
     }, 
  });
  const createdPost = await post.save();
  res.status(201).json(createdPost);
})

export {getPosts, getPostById, createPost};