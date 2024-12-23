import jwt  from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/User.js';

// protect routes 

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Read the JWT from the cookie
    token = req.cookies.jwt;
    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user =  await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorised, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorised, no token');
    }
});

// user middleware

const userPostProtect = (req, res, next) => { 
    if (req.user) { 
        next(); 
    } else {
        res.status(401);
        throw new Error('Not authorized, please log in');
    }
};


export {protect, userPostProtect};