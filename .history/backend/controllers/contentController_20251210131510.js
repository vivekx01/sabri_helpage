// backend/controllers/contentController.js


import Page from '../models/Page.js';

export async function getPageContent(req, res) {
  const { slug } = req.params;
  try {
    const doc = await Page.findOne({ slug });
    if (!doc) return res.status(404).json({ error: 'No content found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updatePageContent(req, res) {
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
}

export async function getAllPages(req, res) {
  try {
    const pages = await Page.find({}, 'slug title');
    res.json(pages.map(page => ({ slug: page.slug, title: page.title })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Dummy implementations for getCauseContent, getTestimonials
export function getCauseContent(req, res) { res.json({}); }
export function getTestimonials(req, res) { res.json([]); }
