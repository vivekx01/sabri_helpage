const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token received:', token ? token.substring(0, 20) + '...' : 'None'); // Debug
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded:', decoded); // Debug
      req.user = await User.findById(decoded.id).select('-password');
      console.log('User found:', req.user ? req.user.email : 'Not found'); // Debug
      if (!req.user) {
        res.status(401);
        throw new Error('User not found');
      }
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message); // Debug
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };
