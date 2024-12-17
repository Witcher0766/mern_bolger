import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email
    })
  } else {
    res.status(401);
    throw new Error("Invalid UserName or Password");
  }

});

// @desc Register user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const {username, email, password} = req.body;
  const userExists = await User.findOne({email});

  if(userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if(user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.username,
      email: user.email,
    })
  }else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});


// @desc Logout user / clear cookies
// @route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.json("logout user");
});

// @desc Get User Profile
// @route POST /api/users/profile
// @access Public
const getUserProfile = asyncHandler(async (req, res) => {
  res.json("get user profile");
});

// @desc Update User Profile
// @route PUT /api/users/profile
// @access Public
const updateUserProfile = asyncHandler(async (req, res) => {
  res.json("update user profile");
});

export { loginUser, registerUser, logoutUser };
