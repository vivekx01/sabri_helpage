const asyncHandler = require('express-async-handler');
const Donor = require('../models/Donor');

const getDonors = asyncHandler(async (req, res) => {
  const donors = await Donor.find({}).sort({ createdAt: -1 });
  res.json({ success: true, data: donors });
});

const getDonorById = asyncHandler(async (req, res) => {
  const donor = await Donor.findById(req.params.id);
  if (!donor) {
    res.status(404);
    throw new Error('Donor not found');
  }
  res.json({ success: true, data: donor });
});

const createDonor = asyncHandler(async (req, res) => {
  const { name, email, phone, amount, address } = req.body;
  
  if (!name || !email || !phone || !amount) {
    res.status(400);
    throw new Error('Please provide required fields');
  }

  const donor = await Donor.create({
    name, email, phone, amount, address,
    createdBy: req.user._id
  });
  
  res.status(201).json({ success: true, data: donor });
});

const updateDonor = asyncHandler(async (req, res) => {
  const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!donor) {
    res.status(404);
    throw new Error('Donor not found');
  }
  
  res.json({ success: true, data: donor });
});

const deleteDonor = asyncHandler(async (req, res) => {
  const donor = await Donor.findById(req.params.id);
  if (!donor) {
    res.status(404);
    throw new Error('Donor not found');
  }
  await donor.deleteOne();
  res.json({ success: true, message: 'Donor deleted' });
});

module.exports = { getDonors, getDonorById, createDonor, updateDonor, deleteDonor };