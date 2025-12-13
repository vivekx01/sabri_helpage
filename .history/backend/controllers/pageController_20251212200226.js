
const Page = require('../models/Page');


const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find({}, 'slug title header updatedAt');
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getPageBySlug = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase();
    const page = await Page.findOne({ slug });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createPage = async (req, res) => {
  try {
    const { slug, ...data } = req.body;
    if (!slug) {
      return res.status(400).json({ message: 'Slug is required' });
    }
    const exists = await Page.findOne({ slug });
    if (exists) {
      return res.status(400).json({ message: 'Page with this slug already exists' });
    }
    const page = new Page({ slug, ...data });
    await page.save();
    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const duplicatePage = async (req, res) => {
  try {
    const { originalSlug, newSlug } = req.body;
    const originalPage = await Page.findOne({ slug: originalSlug });
    if (!originalPage) {
      return res.status(404).json({ message: 'Original page not found' });
    }
    const exists = await Page.findOne({ slug: newSlug });
    if (exists) {
      return res.status(400).json({ message: 'Page with this new slug already exists' });
    }
    const duplicatedPage = new Page({ ...originalPage.toObject(), slug: newSlug });
    await duplicatedPage.save();
    res.status(201).json(duplicatedPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updatePage = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase();
    let page = await Page.findOne({ slug });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    Object.assign(page, req.body);
    await page.save();
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deletePage = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase();
    await Page.deleteOne({ slug });
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
