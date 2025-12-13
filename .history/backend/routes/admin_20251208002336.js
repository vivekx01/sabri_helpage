const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Import Models
const GlobalConfig = require('../models/GlobalConfig');
const Page = require('../models/Page');
const Cause = require('../models/Cause');
const Story = require('../models/Story');
const Event = require('../models/Event');
const Blog = require('../models/Blog');
const FAQ = require('../models/FAQ');
const Award = require('../models/Award');
const Publication = require('../models/Publication');
const Contact = require('../models/Contact');
const Internship = require('../models/Internship');
const CSR = require('../models/CSR');

// ========== GLOBAL CONFIG ==========

// Get global config
router.get('/config', auth, async (req, res) => {
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

// Update global config
router.put('/config', auth, async (req, res) => {
  try {
    let config = await GlobalConfig.findOne();
    if (!config) {
      config = new GlobalConfig(req.body);
    } else {
      Object.assign(config, req.body);
    }
    await config.save();
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== PAGES ==========

// Get all pages
router.get('/pages', auth, async (req, res) => {
  try {
    const pages = await Page.find().sort({ slug: 1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single page
router.get('/pages/:slug', auth, async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create/Update page
router.put('/pages/:slug', auth, async (req, res) => {
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

// Delete page
router.delete('/pages/:slug', auth, async (req, res) => {
  try {
    await Page.findOneAndDelete({ slug: req.params.slug });
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== CAUSES ==========

// Get all causes
router.get('/causes', auth, async (req, res) => {
  try {
    const causes = await Cause.find().sort({ order: 1 });
    res.json(causes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single cause
router.get('/causes/:slug', auth, async (req, res) => {
  try {
    const cause = await Cause.findOne({ slug: req.params.slug });
    res.json(cause);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create/Update cause
router.put('/causes/:slug', auth, async (req, res) => {
  try {
    let cause = await Cause.findOne({ slug: req.params.slug });
    if (!cause) {
      cause = new Cause({ slug: req.params.slug, ...req.body });
    } else {
      Object.assign(cause, req.body);
    }
    await cause.save();
    res.json(cause);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== STORIES ==========

// Get all stories
router.get('/stories', auth, async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create story
router.post('/stories', auth, async (req, res) => {
  try {
    const story = new Story(req.body);
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update story
router.put('/stories/:id', auth, async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(story);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete story
router.delete('/stories/:id', auth, async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.json({ message: 'Story deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== EVENTS ==========

// Get all events
router.get('/events', auth, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create event
router.post('/events', auth, async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update event
router.put('/events/:id', auth, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete event
router.delete('/events/:id', auth, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== BLOGS ==========

// Get all blogs
router.get('/blogs', auth, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create blog
router.post('/blogs', auth, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update blog
router.put('/blogs/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete blog
router.delete('/blogs/:id', auth, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== FAQs ==========

// Get all FAQs
router.get('/faqs', auth, async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create FAQ
router.post('/faqs', auth, async (req, res) => {
  try {
    const faq = new FAQ(req.body);
    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update FAQ
router.put('/faqs/:id', auth, async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(faq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete FAQ
router.delete('/faqs/:id', auth, async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== AWARDS ==========

// Get all awards
router.get('/awards', auth, async (req, res) => {
  try {
    const awards = await Award.find().sort({ year: -1 });
    res.json(awards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create award
router.post('/awards', auth, async (req, res) => {
  try {
    const award = new Award(req.body);
    await award.save();
    res.status(201).json(award);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update award
router.put('/awards/:id', auth, async (req, res) => {
  try {
    const award = await Award.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(award);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete award
router.delete('/awards/:id', auth, async (req, res) => {
  try {
    await Award.findByIdAndDelete(req.params.id);
    res.json({ message: 'Award deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== PUBLICATIONS ==========

// Get all publications
router.get('/publications', auth, async (req, res) => {
  try {
    const publications = await Publication.find().sort({ publishDate: -1 });
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create publication
router.post('/publications', auth, async (req, res) => {
  try {
    const publication = new Publication(req.body);
    await publication.save();
    res.status(201).json(publication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update publication
router.put('/publications/:id', auth, async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(publication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete publication
router.delete('/publications/:id', auth, async (req, res) => {
  try {
    await Publication.findByIdAndDelete(req.params.id);
    res.json({ message: 'Publication deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== CONTACTS (View/Manage) ==========

// Get all contacts
router.get('/contacts', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update contact status
router.put('/contacts/:id/status', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete contact
router.delete('/contacts/:id', auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== INTERNSHIPS (View/Manage) ==========

// Get all internship applications
router.get('/internships', auth, async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update internship status
router.put('/internships/:id/status', auth, async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(internship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ========== CSR PROPOSALS (View/Manage) ==========

// Get all CSR proposals
router.get('/csr', auth, async (req, res) => {
  try {
    const csrProposals = await CSR.find().sort({ createdAt: -1 });
    res.json(csrProposals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update CSR proposal status
router.put('/csr/:id/status', auth, async (req, res) => {
  try {
    const csr = await CSR.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(csr);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
