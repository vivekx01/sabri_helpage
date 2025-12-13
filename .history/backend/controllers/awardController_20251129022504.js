const asyncHandler = require('express-async-handler');
const Award = require('../models/Award');

const getAwards = asyncHandler(async (req, res) => {
  const awards = await Award.find({}).sort({ year: -1 });
  res.json({ success: true, data: awards });
});

const getAwardById = asyncHandler(async (req, res) => {
  const award = await Award.findById(req.params.id);
  if (!award) {
    res.status(404);
    throw new Error('Award not found');
  }
  res.json({ success: true, data: award });
});

const createAward = asyncHandler(async (req, res) => {
  const { title, imageUrl, year } = req.body;
  
  if (!title || !imageUrl || !year) {
    res.status(400);
    throw new Error('Please provide required fields');
  }

  const award = await Award.create({ title, imageUrl, year });
  res.status(201).json({ success: true, data: award });
});

const updateAward = asyncHandler(async (req, res) => {
  const award = await Award.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!award) {
    res.status(404);
    throw new Error('Award not found');
  }
  
  res.json({ success: true, data: award });
});

const deleteAward = asyncHandler(async (req, res) => {
  const award = await Award.findById(req.params.id);
  if (!award) {
    res.status(404);
    throw new Error('Award not found');
  }
  await award.deleteOne();
  res.json({ success: true, message: 'Award deleted' });
});

module.exports = { getAwards, getAwardById, createAward, updateAward, deleteAward };