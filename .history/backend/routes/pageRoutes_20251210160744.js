const express = require('express');
const router = express.Router();
const Page = require('../models/Page');

// GET all pages
router.get('/', async (req, res) => {
  try {
    const pages = await Page.find();
    res.json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET page by slug
router.get('/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE new page
router.post('/', async (req, res) => {
  try {
    const page = new Page(req.body);
    await page.save();
    res.status(201).json(page);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE page by slug
router.put('/:slug', async (req, res) => {
  try {
    const page = await Page.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE page by slug
router.delete('/:slug', async (req, res) => {
  try {
    const page = await Page.findOneAndDelete({ slug: req.params.slug });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json({ message: 'Page deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
