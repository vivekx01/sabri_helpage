const asyncHandler = require('express-async-handler');
const Internship = require('../models/Internship');

const getInternships = asyncHandler(async (req, res) => {
  const internships = await Internship.find({}).sort({ createdAt: -1 });
  res.json({ success: true, data: internships });
});

const getInternshipById = asyncHandler(async (req, res) => {
  const internship = await Internship.findById(req.params.id);
  if (!internship) {
    res.status(404);
    throw new Error('Internship not found');
  }
  res.json({ success: true, data: internship });
});

const createInternship = asyncHandler(async (req, res) => {
  const { name, email, resumeUrl, status } = req.body;
  
  if (!name || !email || !resumeUrl) {
    res.status(400);
    throw new Error('Please provide name, email, and resumeUrl');
  }

  const internship = await Internship.create({ name, email, resumeUrl, status });
  res.status(201).json({ success: true, data: internship });
});

const updateInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!internship) {
    res.status(404);
    throw new Error('Internship not found');
  }
  
  res.json({ success: true, data: internship });
});

const deleteInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.findById(req.params.id);
  if (!internship) {
    res.status(404);
    throw new Error('Internship not found');
  }
  await internship.deleteOne();
  res.json({ success: true, message: 'Internship deleted' });
});

module.exports = { getInternships, getInternshipById, createInternship, updateInternship, deleteInternship };
