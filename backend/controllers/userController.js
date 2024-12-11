import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";



// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  res.json('auth user');
})



// @desc Register user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    res.json('register user');
  })

// @desc Logout user / clear cookies
// @route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
    res.json('logout user');
  })



// @desc Get User Profile
// @route POST /api/users/profile
// @access Public
const getUserProfile = asyncHandler(async (req, res) => {
    res.json('get user profile');
  })

// @desc Update User Profile
// @route PUT /api/users/profile
// @access Public
const updateUserProfile = asyncHandler(async (req, res) => {
    res.json('update user profile');
  })  


  export {loginUser, registerUser, logoutUser};

