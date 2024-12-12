import express from "express";
const router = express.Router();
import { loginUser, registerUser, logoutUser } from "../controllers/userController.js";


router.route('/').post(registerUser);
router.post('/logout', logoutUser);
router.post('/login', loginUser);


export default router;