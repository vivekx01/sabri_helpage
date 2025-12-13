const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const Story = require('../models/Story');

// @route   GET /api/stories
// @desc    Get all stories
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, tag, featured, limit = 10, page = 1, search } = req.query;
    const query = {};
    
    if (category) query.categories = category;
    if (tag) query.tags = tag;
    if (featured) query.isFeatured = featured === 'true';
    if (search) query.$text = { $search: search };
    
    const stories = await Story.find(query)
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const count = await Story.countDocuments(query);
    
    res.json({
      stories,
      totalPages: Math.ceil(count / parseInt(limit)),
      currentPage: parseInt(page),
      totalStories: count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/stories/featured
// @desc    Get featured stories
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const stories = await Story.find({ isFeatured: true })
      .sort({ publishedAt: -1 })
      .limit(3);
    
    res.json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/stories/:slug
// @desc    Get single story by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const story = await Story.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { 'meta.views': 1 } },
      { new: true }
    );
    
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    
    // Get related stories (same categories or tags)
    const relatedStories = await Story.find({
      _id: { $ne: story._id },
      $or: [
        { categories: { $in: story.categories } },
        { tags: { $in: story.tags } }
      ]
    }).limit(3);
    
    res.json({ story, relatedStories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/stories
// @desc    Create a new story
// @access  Private/Admin
router.post('/', auth, admin, async (req, res) => {
  try {
    const newStory = new Story({
      ...req.body,
      author: {
        name: req.user.name,
        role: 'Admin',
        avatar: req.user.avatar
      }
    });
    
    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/stories/:id
// @desc    Update a story
// @access  Private/Admin
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    
    res.json(story);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/stories/:id
// @desc    Delete a story
// @access  Private/Admin
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    
    res.json({ message: 'Story removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
