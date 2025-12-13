const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

router.post('/login', loginUser);
router.post('/register', protect, permit('super-admin'), registerUser);
router.get('/me', protect, getMe);

module.exports = router;
