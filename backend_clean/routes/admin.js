const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const Page = require('../models/Page');

// Get all pages (admin only)
router.get('/pages', auth, admin, async (req, res) => {
  try {
    const pages = await Page.find().sort({ updatedAt: -1 });
    res.json(pages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create or update page (admin only)
router.post('/pages', auth, admin, async (req, res) => {
  try {
    const { slug, title, header, sections, meta } = req.body;
    
    let page = await Page.findOne({ slug });
    
    if (page) {
      // Update existing page
      page.title = title || page.title;
      page.header = header || page.header;
      page.sections = sections || page.sections;
      page.meta = meta || page.meta;
      page.updatedAt = Date.now();
    } else {
      // Create new page
      page = new Page({
        slug,
        title,
        header,
        sections: sections || [],
        meta: meta || {},
        updatedAt: Date.now()
      });
    }
    
    await page.save();
    res.json(page);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete page (admin only)
router.delete('/pages/:slug', auth, admin, async (req, res) => {
  try {
    const page = await Page.findOneAndDelete({ slug: req.params.slug });
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    res.json({ message: 'Page deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/users', auth, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
