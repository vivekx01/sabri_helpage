// backend/controllers/contentController.js
const mongoose = require('mongoose');
const models = {
  home: require('../models/HomePage'),
  about: require('../models/AboutPage'),
  causes: require('../models/CausesPage'),
  donate: require('../models/DonatePage'),
  news: require('../models/NewsPage'),
  sociofare: require('../models/SociofarePage'),
  stats: require('../models/StatsPage'),
  gallery: require('../models/GalleryPage'),
  privacy: require('../models/PrivacyPage'),
  terms: require('../models/TermsPage'),
  contact: require('../models/ContactPage'),
  blog: require('../models/BlogPage'),
  faq: require('../models/FAQPage'),
  volunteer: require('../models/VolunteerPage'),
  internship: require('../models/InternshipPage'),
  ilc: require('../models/ILCPage'),
  elderlycare: require('../models/ElderlyCarePage'),
  girl_education: require('../models/GirlEducationPage'),
  mental_health: require('../models/MentalHealthPage'),
  csrsummit: require('../models/CSRSummitPage'),
  education: require('../models/EducationPage'),
  stories: require('../models/StoriesPage'),
  publication: require('../models/Publication'),
  award: require('../models/Award'),
};

function getModel(slug) {
  // Normalize slug to kebab-case
  slug = slug.toLowerCase().replace(/[_\s]/g, '-');
  // Direct match
  if (models[slug]) return models[slug];
  // Try singular/plural fallback
  if (models[slug.replace(/s$/, '')]) return models[slug.replace(/s$/, '')];
  if (models[slug + 's']) return models[slug + 's'];
  // Try matching with model keys that are camelCase or PascalCase
  for (const key of Object.keys(models)) {
    const normKey = key.toLowerCase().replace(/[_\s]/g, '-');
    if (normKey === slug) return models[key];
  }
  return null;
}

exports.getPageContent = async (req, res) => {
  const { slug } = req.params;
  const Model = getModel(slug);
  if (!Model) return res.status(404).json({ error: 'Page not found' });
  try {
    const doc = await Model.findOne();
    if (!doc) return res.status(404).json({ error: 'No content found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePageContent = async (req, res) => {
  const { slug } = req.params;
  const Model = getModel(slug);
  if (!Model) return res.status(404).json({ error: 'Page not found' });
  try {
    let doc = await Model.findOne();
    if (!doc) {
      doc = new Model(req.body);
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
    const slugs = Object.keys(models);
    res.json(slugs.map(slug => ({ slug })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Dummy implementations for getCauseContent, getTestimonials
exports.getCauseContent = (req, res) => res.json({});
exports.getTestimonials = (req, res) => res.json([]);
