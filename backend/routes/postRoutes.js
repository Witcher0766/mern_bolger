import express from "express";
const router = express.Router();
// import posts from '../data/posts.js'
import asyncHandler from '../middleware/asyncHandler.js';
import PostModel from "../models/Post.js";


// get all posts
router.get('/', asyncHandler(async (req, res) => {
    const posts = await PostModel.find({});
    res.json(posts);
}));



// get all posts by id
router.get('/:id', asyncHandler(async (req, res) => {
   const posts = await PostModel.findById(req.params.id);
   if(posts) {
     return res.json(posts);
   }
    res.status(404).json({message: 'Post Not Found'});
}));


// get all posts by userId
// router.get('/', asyncHandler(async (req, res) => {
//     res.json(posts);
// }));



export default router;