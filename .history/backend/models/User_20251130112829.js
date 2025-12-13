const express = require('express');
const router = express.Router();

const { 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser,
  createUser
} = require('../controllers/userController');

// Create user
router.post('/users', createUser);

// Get all users
router.get('/users', getUsers);

// Get single user
router.get('/users/:id', getUserById);

// Update user
router.put('/users/:id', updateUser);

// Delete user
router.delete('/users/:id', deleteUser);

module.exports = router;
