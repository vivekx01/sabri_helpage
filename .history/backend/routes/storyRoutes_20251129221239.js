const express = require('express');
const router = express.Router();
const { getStories, getStoryById, createStory, updateStory, deleteStory } = require('../controllers/storyController');

router.get('/stories', getStories);
router.get('/stories/:id', getStoryById);
router.post('/stories', createStory);
router.put('/stories/:id', updateStory);
router.delete('/stories/:id', deleteStory);

module.exports = router;
