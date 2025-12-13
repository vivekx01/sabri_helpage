const express = require('express');
const router = express.Router();

// Import Models
const GlobalConfig = require('../models/GlobalConfig');
const Page = require('../models/Page');
const Cause = require('../models/Cause');
const Story = require('../models/Story');
const Event = require('../models/Event');
const Blog = require('../models/Blog');
const FAQ = require('../models/Faq');
const Award = require('../models/Award');
const Publication = require('../models/Publication');
const Contact = require('../models/Contact');
const Internship = require('../models/Internship');
const CSR = require('../models/CSR');

// ========== PUBLIC CONFIG ==========

// Get global config (public)
router.get('/config', async (req, res) => {
  try {
    let config = await GlobalConfig.findOne();
    if (!config) {
      config = await GlobalConfig.create({});
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== PUBLIC PAGES ==========

// Get single page (public)
router.get('/pages/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, status: 'published' });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== PUBLIC CAUSES ==========

// Get all causes (public)
router.get('/causes', async (req, res) => {
  try {
    const causes = await Cause.find({ status: 'published' }).sort({ order: 1 });
    res.json(causes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single cause (public)
router.get('/causes/:slug', async (req, res) => {
  try {
    const cause = await Cause.findOne({ slug: req.params.slug, status: 'published' });
    if (!cause) {
      return res.status(404).json({ message: 'Cause not found' });
    }
    res.json(cause);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== PUBLIC STORIES ==========

// Get all stories (public)
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find({ status: 'published' }).sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single story (public)
router.get('/stories/:id', async (req, res) => {
  try {
    const story = await Story.findOne({ _id: req.params.id, status: 'published' });
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== PUBLIC EVENTS ==========

// Get all events (public)
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find({ status: 'published' }).sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single event (public)
router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, status: 'published' });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== PUBLIC BLOGS ==========

// Get all blogs (public)
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single blog (public)
router.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id, status: 'published' });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== PUBLIC FAQs ==========

// Get all FAQs (public)
router.get('/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find({ status: 'active' }).sort({ order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== PUBLIC AWARDS ==========

// Get all awards (public)
router.get('/awards', async (req, res) => {
  try {
    const awards = await Award.find({ status: 'published' }).sort({ year: -1 });
    res.json(awards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== PUBLIC PUBLICATIONS ==========

// Get all publications (public)
router.get('/publications', async (req, res) => {
  try {
    const publications = await Publication.find({ status: 'published' }).sort({ publishDate: -1 });
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== PUBLIC CONTACT FORM ==========

// Submit contact form
router.post('/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ========== PUBLIC INTERNSHIP FORM ==========

// Submit internship application
router.post('/internship', async (req, res) => {
  try {
    const internship = new Internship(req.body);
    await internship.save();
    res.status(201).json({ message: 'Internship application submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ========== PUBLIC CSR FORM ==========

// Submit CSR proposal
router.post('/csr', async (req, res) => {
  try {
    const csr = new CSR(req.body);
    await csr.save();
    res.status(201).json({ message: 'CSR proposal submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
