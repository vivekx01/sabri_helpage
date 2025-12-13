const express = require('express');
const router = express.Router();
const Page = require('../models/Page');

// Get all pages (public)
router.get('/pages', async (req, res) => {
  try {
    const pages = await Page.find()
      .select('-sections -meta')
      .sort({ updatedAt: -1 });
    res.json(pages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single page by slug (public)
router.get('/pages/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    res.json(page);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
