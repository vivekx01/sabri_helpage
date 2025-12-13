const asyncHandler = require('express-async-handler');
const ClubRegistration = require('../models/ClubRegistration');

const getClubRegistrations = asyncHandler(async (req, res) => {
  const clubs = await ClubRegistration.find({}).sort({ createdAt: -1 });
  res.json({ success: true, data: clubs });
});

const getClubRegistrationById = asyncHandler(async (req, res) => {
  const club = await ClubRegistration.findById(req.params.id);
  if (!club) {
    res.status(404);
    throw new Error('Registration not found');
  }
  res.json({ success: true, data: club });
});

const createClubRegistration = asyncHandler(async (req, res) => {
  const { name, phone, college, city } = req.body;
  
  if (!name || !phone || !college || !city) {
    res.status(400);
    throw new Error('Please provide all fields');
  }

  const club = await ClubRegistration.create({ name, phone, college, city });
  res.status(201).json({ success: true, data: club });
});

const updateClubRegistration = asyncHandler(async (req, res) => {
  const club = await ClubRegistration.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!club) {
    res.status(404);
    throw new Error('Registration not found');
  }
  
  res.json({ success: true, data: club });
});

const deleteClubRegistration = asyncHandler(async (req, res) => {
  const club = await ClubRegistration.findById(req.params.id);
  if (!club) {
    res.status(404);
    throw new Error('Registration not found');
  }
  await club.deleteOne();
  res.json({ success: true, message: 'Registration deleted' });
});

module.exports = {
  getClubRegistrations,
  getClubRegistrationById,
  createClubRegistration,
  updateClubRegistration,
  deleteClubRegistration
};
