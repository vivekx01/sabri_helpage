const express = require('express');
const router = express.Router();
const { getStories, getStoryById, createStory, updateStory, deleteStory } = require('../controllers/storyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stories', getStories);
router.get('/stories/:id', getStoryById);
router.post('/stories', protect, createStory);
router.put('/stories/:id', protect, updateStory);
router.delete('/stories/:id', protect, deleteStory);

module.exports = router;
