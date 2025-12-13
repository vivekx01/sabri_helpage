const asyncHandler = require('express-async-handler');
const Publication = require('../models/Publication');

const getPublications = asyncHandler(async (req, res) => {
  const publications = await Publication.find({}).sort({ year: -1 });
  res.json({ success: true, data: publications });
});

const getPublicationById = asyncHandler(async (req, res) => {
  const publication = await Publication.findById(req.params.id);
  if (!publication) {
    res.status(404);
    throw new Error('Publication not found');
  }
  res.json({ success: true, data: publication });
});

const createPublication = asyncHandler(async (req, res) => {
  const { title, fileUrl, year } = req.body;
  
  if (!title || !fileUrl || !year) {
    res.status(400);
    throw new Error('Please provide required fields');
  }

  const publication = await Publication.create({ title, fileUrl, year });
  res.status(201).json({ success: true, data: publication });
});

const updatePublication = asyncHandler(async (req, res) => {
  const publication = await Publication.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!publication) {
    res.status(404);
    throw new Error('Publication not found');
  }
  
  res.json({ success: true, data: publication });
});

const deletePublication = asyncHandler(async (req, res) => {
  const publication = await Publication.findById(req.params.id);
  if (!publication) {
    res.status(404);
    throw new Error('Publication not found');
  }
  await publication.deleteOne();
  res.json({ success: true, message: 'Publication deleted' });
});

module.exports = { getPublications, getPublicationById, createPublication, updatePublication, deletePublication };