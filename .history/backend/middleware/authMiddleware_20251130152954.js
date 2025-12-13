const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    const error = new Error('Not authorized, no token');
    error.statusCode = 401;
    res.status(401);
    throw error;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-change-in-production');
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      const error = new Error('User not found');
      error.statusCode = 401;
      res.status(401);
      throw error;
    }
    
    next();
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    const authError = new Error('Not authorized, token failed');
    authError.statusCode = 401;
    res.status(401);
    throw authError;
  }
});

module.exports = { protect };
