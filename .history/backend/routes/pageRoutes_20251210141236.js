const express = require('express');
const router = express.Router();
const Page = require('../models/Page');

// Get all pages
router.get('/', async (req, res) => {
  try {
    const pages = await Page.find({}, '-__v');
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single page by slug
router.get('/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug }, '-__v');
    if (!page) return res.status(404).json({ message: 'Page not found' });
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update or create page by slug
router.put('/:slug', async (req, res) => {
  try {
    let page = await Page.findOne({ slug: req.params.slug });
    if (!page) {
      page = new Page({ slug: req.params.slug, ...req.body });
    } else {
      Object.assign(page, req.body);
    }
    await page.save();
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
