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
