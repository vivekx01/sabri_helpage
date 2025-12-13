const express = require('express');
const router = express.Router();
const { getStories, getStoryById, createStory, updateStory, deleteStory } = require('../controllers/storyController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

router.get('/stories', getStories);
router.get('/stories/:id', getStoryById);
router.post('/stories', protect, permit('editor', 'manager', 'admin', 'super-admin'), createStory);
router.put('/stories/:id', protect, permit('editor', 'manager', 'admin', 'super-admin'), updateStory);
router.delete('/stories/:id', protect, permit('manager', 'admin', 'super-admin'), deleteStory);

module.exports = router;
