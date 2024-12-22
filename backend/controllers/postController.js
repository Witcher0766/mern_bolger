import asyncHandler from "../middleware/asyncHandler.js";
import PostModel from "../models/Post.js";

// @desc Fetch all posts
// @route GET /api/posts
// @access Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await PostModel.find({});
  res.json(posts);
});

// @desc Fetch post by id
// @route GET /api/posts/:id
// @access Public
const getPostById = asyncHandler(async (req, res) => {
  const posts = await PostModel.findById(req.params.id).populate("author");
  if (posts) {
    return res.json(posts);
  }
  res.status(404).json({ message: "Post Not Found" });
});

// @desc create a posts
// @route POST /api/posts
// @access PRIVATE/users
const createPost = asyncHandler(async (req, res) => {
  const { title, summary, content, cover } = req.body;
  if (!title || !summary || !content || !cover) {
    res.status(400);
    throw new Error("All fields are required");
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
});

// @desc Update a post
// @route PUT /api/posts/:id
// @access Private
const updatePost = asyncHandler(async (req, res) => {
  const { title, summary, content, cover } = req.body;
  const post = await PostModel.findById(req.params.id);

  if (post) {
    (post.title = title),
      (post.summary = summary),
      (post.content = content),
      (post.cover = cover);
    const updatePost = await post.save();
    res.json(updatePost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc Delete a post
// @route DELETE /api/posts/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (post) {
    await PostModel.deleteOne({ _id: post._id });
    res.status(200).json({ message: "Product Deleted" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

export { getPosts, getPostById, createPost, updatePost, deletePost };
