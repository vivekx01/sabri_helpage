const express = require('express');
const router = express.Router();
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

router.get('/users', protect, permit('admin', 'super-admin'), getUsers);
router.get('/users/:id', protect, permit('admin', 'super-admin'), getUserById);
router.put('/users/:id', protect, permit('admin', 'super-admin'), updateUser);
router.delete('/users/:id', protect, permit('super-admin'), deleteUser);

module.exports = router;
