// backend/controllers/contentController.js

const Page = require('../models/Page');

function getModel() {
  return Page;
}

exports.getPageContent = async (req, res) => {
  const { slug } = req.params;
  try {
    const doc = await Page.findOne({ slug });
    if (!doc) return res.status(404).json({ error: 'No content found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePageContent = async (req, res) => {
  const { slug } = req.params;
  try {
    let doc = await Page.findOne({ slug });
    if (!doc) {
      doc = new Page({ ...req.body, slug });
    } else {
      Object.assign(doc, req.body);
    }
    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPagesList = async (req, res) => {
  try {
    const pages = await Page.find({}, 'slug title');
    res.json(pages.map(page => ({ slug: page.slug, title: page.title })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Dummy implementations for getCauseContent, getTestimonials
exports.getCauseContent = (req, res) => res.json({});
exports.getTestimonials = (req, res) => res.json([]);
