const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('../models/User');

// Simple GET endpoint for /login to avoid 404 when accessed via browser
router.get('/login', (req, res) => {
  res.json({ message: 'Use POST to /api/auth/login to log in.' });
});

// Use the same CORS configuration as in server.js
const corsOptions = {
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:3000'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Login route
router.post('/login', cors(corsOptions), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          data: {
            token,
            user: {
              id: user.id,
              email: user.email,
              role: user.role
            }
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Logout route
router.post('/logout', cors(corsOptions), async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      try {
        // Verify token to get user info for logging
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        console.log(`User ${decoded.user.email} logged out`);
      } catch (err) {
        // Token might be expired or invalid, but we still allow logout
        console.log('Logout requested with invalid/expired token');
      }
    }

    // Since JWT is stateless, we just return success
    // In a production app with token blacklisting, you'd invalidate the token here
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
});

// Register route (for creating super admin)
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    user = new User({
      email,
      password,
      role: role || 'admin'
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          data: {
            token,
            user: {
              id: user.id,
              email: user.email,
              role: user.role
            }
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
