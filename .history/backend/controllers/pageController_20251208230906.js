const AboutPage = require('../models/AboutPage');
const Award = require('../models/Award');
const BlogPage = require('../models/BlogPage');
const ContactPage = require('../models/ContactPage');
const CSRSummitPage = require('../models/CSRSummitPage');
const EducationPage = require('../models/EducationPage');
const ElderlyCarePage = require('../models/ElderlyCarePage');
const FAQPage = require('../models/FAQPage');
const GalleryPage = require('../models/GalleryPage');
const GirlEducationPage = require('../models/GirlEducationPage');
const HomePage = require('../models/HomePage');
const ILCPage = require('../models/ILCPage');
const InternshipPage = require('../models/InternshipPage');
const MentalHealthPage = require('../models/MentalHealthPage');
const NewsPage = require('../models/NewsPage');
const PrivacyPage = require('../models/PrivacyPage');
const Publication = require('../models/Publication');
const SociofarePage = require('../models/SociofarePage');
const StoriesPage = require('../models/StoriesPage');
const TermsPage = require('../models/TermsPage');
const VolunteerPage = require('../models/VolunteerPage');

// Unified slug mapping (kebab-case)
const slugMap = {
  'about': AboutPage,
  'award': Award,
  'awards': Award,
  'blog': BlogPage,
  'contact': ContactPage,
  'csr-summit': CSRSummitPage,
  'education': EducationPage,
  'elderly-care': ElderlyCarePage,
  'faq': FAQPage,
  'gallery': GalleryPage,
  'girl-education': GirlEducationPage,
  'home': HomePage,
  'ilc': ILCPage,
  'internship': InternshipPage,
  'mental-health': MentalHealthPage,
  'news': NewsPage,
  'privacy': PrivacyPage,
  'publication': Publication,
  'publications': Publication,
  'sociofare': SociofarePage,
  'stories': StoriesPage,
  'terms': TermsPage,
  'volunteer': VolunteerPage,
};

const getAllPages = async (req, res) => {
  try {
    res.json(Object.keys(slugMap));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPageBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    let pageData = null;

    // Normalize slug to kebab-case
    const normSlug = slug.toLowerCase().replace(/[_\s]/g, '-');
    let Model = slugMap[normSlug];
    if (!Model) {
      // Try singular/plural fallback
      Model = slugMap[normSlug.replace(/s$/, '')] || slugMap[normSlug + 's'];
    }
    if (Model) {
      pageData = await Model.findOne().sort({ createdAt: -1 });
    }
    if (!pageData) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(pageData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPage = async (req, res) => {
  try {
    const { slug, ...data } = req.body;
    const Model = slugMap[slug];
    if (!Model) {
      return res.status(400).json({ message: 'Invalid page slug' });
    }
    const page = new Model(data);
    await page.save();
    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const duplicatePage = async (req, res) => {
  try {
    const { originalSlug, newSlug } = req.body;
    const OriginalModel = slugMap[originalSlug];
    if (!OriginalModel) {
      return res.status(400).json({ message: 'Invalid original page slug' });
    }
    const originalPage = await OriginalModel.findOne().sort({ createdAt: -1 });
    if (!originalPage) {
      return res.status(404).json({ message: 'Original page not found' });
    }
    const NewModel = slugMap[newSlug];
    if (!NewModel) {
      return res.status(400).json({ message: 'Invalid new page slug' });
    }
    const duplicatedPage = new NewModel(originalPage.toObject());
    await duplicatedPage.save();
    res.status(201).json(duplicatedPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePage = async (req, res) => {
  try {
    const slug = req.params.slug;
    const Model = slugMap[slug];
    if (!Model) {
      return res.status(400).json({ message: 'Invalid page slug' });
    }
    let page = await Model.findOne().sort({ createdAt: -1 });
    if (!page) {
      page = new Model(req.body);
    } else {
      Object.assign(page, req.body);
    }
    await page.save();
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePage = async (req, res) => {
  try {
    const slug = req.params.slug;
    const Model = slugMap[slug];
    if (!Model) {
      return res.status(400).json({ message: 'Invalid page slug' });
    }
    await Model.deleteMany({});
    res.json({ message: 'Page deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPages,
  getPageBySlug,
  createPage,
  duplicatePage,
  updatePage,
  deletePage,
};
