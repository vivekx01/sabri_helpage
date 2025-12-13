const asyncHandler = require('express-async-handler');
const Faq = require('../models/Faq');

const getFaqs = asyncHandler(async (req, res) => {
  const faqs = await Faq.find({}).sort({ order: 1 });
  res.json({ success: true, data: faqs });
});

const getFaqById = asyncHandler(async (req, res) => {
  const faq = await Faq.findById(req.params.id);
  if (!faq) {
    res.status(404);
    throw new Error('FAQ not found');
  }
  res.json({ success: true, data: faq });
});

const createFaq = asyncHandler(async (req, res) => {
  const { question, answer, order } = req.body;
  
  if (!question || !answer) {
    res.status(400);
    throw new Error('Please provide question and answer');
  }

  const faq = await Faq.create({ question, answer, order });
  res.status(201).json({ success: true, data: faq });
});

const updateFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!faq) {
    res.status(404);
    throw new Error('FAQ not found');
  }
  
  res.json({ success: true, data: faq });
});

const deleteFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findById(req.params.id);
  if (!faq) {
    res.status(404);
    throw new Error('FAQ not found');
  }
  await faq.deleteOne();
  res.json({ success: true, message: 'FAQ deleted' });
});

module.exports = { getFaqs, getFaqById, createFaq, updateFaq, deleteFaq };
