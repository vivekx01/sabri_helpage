const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const Gallery = require('../models/Gallery');

// @route   GET /api/galleries
// @desc    Get all galleries
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured, event, limit = 12, page = 1 } = req.query;
    const query = {};
    
    if (category) query.categories = category;
    if (featured) query.isFeatured = featured === 'true';
    if (event) query.event = event;
    
    const galleries = await Gallery.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('event', 'title slug');
    
    const count = await Gallery.countDocuments(query);
    
    res.json({
      galleries,
      totalPages: Math.ceil(count / parseInt(limit)),
      currentPage: parseInt(page),
      totalGalleries: count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/galleries/featured
// @desc    Get featured galleries
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const galleries = await Gallery.find({ isFeatured: true })
      .sort({ date: -1 })
      .limit(6);
    
    res.json(galleries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/galleries/:slug
// @desc    Get single gallery by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const gallery = await Gallery.findOne({ slug: req.params.slug })
      .populate('event', 'title slug');
    
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    
    res.json(gallery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/galleries
// @desc    Create a new gallery
// @access  Private/Admin
router.post('/', auth, admin, async (req, res) => {
  try {
    const newGallery = new Gallery(req.body);
    const savedGallery = await newGallery.save();
    res.status(201).json(savedGallery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/galleries/:id
// @desc    Update a gallery
// @access  Private/Admin
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    
    res.json(gallery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/galleries/:id
// @desc    Delete a gallery
// @access  Private/Admin
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    
    res.json({ message: 'Gallery removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
