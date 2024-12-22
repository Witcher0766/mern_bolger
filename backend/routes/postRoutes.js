import express from "express";
const router = express.Router();
import { getPosts, getPostById, createPost, updatePost } from "../controllers/postController.js";
import { protect, userPostProtect } from "../middleware/authMiddleware.js";

router.route('/').get(getPosts).post(protect, userPostProtect, createPost);
router.route('/:id').get(getPostById).put(protect, userPostProtect, updatePost );


export default router;