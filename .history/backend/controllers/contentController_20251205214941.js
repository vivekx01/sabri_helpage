const PageContent = require('../models/PageContent');
const CauseContent = require('../models/CauseContent');
const Testimonial = require('../models/Testimonial');

exports.getPageContent = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await PageContent.findOne({ slug, status: { $ne: 'archived' } });
    if (!page) return res.status(404).json({ error: 'Page content not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch page content' });
  }
};

exports.updatePageContent = async (req, res) => {
  try {
    const { slug } = req.params;
    // Accept flexible fields per content schema
    const { name, meta, header, hero, sections, cta, status } = req.body || {};
    const update = {};
    if (name !== undefined) update.name = name;
    if (meta !== undefined) update.meta = meta;
    if (header !== undefined) update.header = header;
    if (hero !== undefined) update.hero = hero;
    if (Array.isArray(sections)) update.sections = sections;
    if (cta !== undefined) update.cta = cta;
    if (status !== undefined) update.status = status;
    const doc = await PageContent.findOneAndUpdate(
      { slug },
      { $set: { slug, ...update } },
      { upsert: true, new: true }
    );
    res.json({ success: true, page: doc });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update page content' });
  }
};

exports.getCauseContent = async (req, res) => {
  try {
    const { slug } = req.params;
    const cause = await CauseContent.findOne({ slug, status: { $ne: 'archived' } });
    if (!cause) return res.status(404).json({ error: 'Cause content not found' });
    res.json(cause);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cause content' });
  }
};

exports.getTestimonials = async (req, res) => {
  try {
    const items = await Testimonial.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

exports.getPagesList = async (req, res) => {
  try {
    const { pages: PAGE_REGISTRY } = require('../config/adminPages');
    // Prefer existing DB documents; fallback to registry if none
    const docs = await PageContent.find({}, { slug: 1, name: 1, _id: 0 }).lean();
    let list = Array.isArray(docs) && docs.length ? docs : [];
    // Merge registry items not present in DB
    const existingSlugs = new Set(list.map(p => p.slug));
    const merged = [
      ...list,
      ...PAGE_REGISTRY.filter(p => !existingSlugs.has(p.slug)).map(p => ({ slug: p.slug, name: p.name }))
    ];
    res.json(merged);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pages list' });
  }
};
