const asyncHandler = require('express-async-handler');
const Story = require('../models/Story');

const getStories = asyncHandler(async (req, res) => {
  const stories = await Story.find({}).sort({ createdAt: -1 });
  res.json({ success: true, data: stories });
});

const getStoryById = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);
  if (!story) {
    res.status(404);
    throw new Error('Story not found');
  }
  res.json({ success: true, data: story });
});

const createStory = asyncHandler(async (req, res) => {
  const { title, description, image, date } = req.body;
  
  if (!title || !description) {
    res.status(400);
    throw new Error('Please provide title and description');
  }

  const story = await Story.create({ title, description, image, date });
  res.status(201).json({ success: true, data: story });
});

const updateStory = asyncHandler(async (req, res) => {
  const story = await Story.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!story) {
    res.status(404);
    throw new Error('Story not found');
  }
  
  res.json({ success: true, data: story });
});

const deleteStory = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);
  if (!story) {
    res.status(404);
    throw new Error('Story not found');
  }
  await story.deleteOne();
  res.json({ success: true, message: 'Story deleted' });
});

module.exports = { getStories, getStoryById, createStory, updateStory, deleteStory };
