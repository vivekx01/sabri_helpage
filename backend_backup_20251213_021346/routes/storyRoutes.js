const express = require('express');
const router = express.Router();
const { getStories, getStoryById, createStory, updateStory, deleteStory } = require('../controllers/storyController');

router.get('/story', getStories);
router.get('/story/:id', getStoryById);
router.post('/story', createStory);
router.put('/story/:id', updateStory);
router.delete('/story/:id', deleteStory);

module.exports = router;
