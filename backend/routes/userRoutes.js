import express from "express";
const router = express.Router();
import { loginUser, registerUser, logoutUser } from "../controllers/userController";


router.route('/').post(registerUser);
router.post('/logout', logoutUser);
router.post('/login', loginUser);


export default router;