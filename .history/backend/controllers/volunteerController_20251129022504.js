const asyncHandler = require('express-async-handler');
const Volunteer = require('../models/Volunteer');

const getVolunteers = asyncHandler(async (req, res) => {
  const volunteers = await Volunteer.find({}).sort({ createdAt: -1 });
  res.json({ success: true, data: volunteers });
});

const getVolunteerById = asyncHandler(async (req, res) => {
  const volunteer = await Volunteer.findById(req.params.id);
  if (!volunteer) {
    res.status(404);
    throw new Error('Volunteer not found');
  }
  res.json({ success: true, data: volunteer });
});

const createVolunteer = asyncHandler(async (req, res) => {
  const { name, phone, skills } = req.body;
  
  if (!name || !phone) {
    res.status(400);
    throw new Error('Please provide name and phone');
  }

  const volunteer = await Volunteer.create({ name, phone, skills });
  res.status(201).json({ success: true, data: volunteer });
});

const updateVolunteer = asyncHandler(async (req, res) => {
  const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!volunteer) {
    res.status(404);
    throw new Error('Volunteer not found');
  }
  
  res.json({ success: true, data: volunteer });
});

const deleteVolunteer = asyncHandler(async (req, res) => {
  const volunteer = await Volunteer.findById(req.params.id);
  if (!volunteer) {
    res.status(404);
    throw new Error('Volunteer not found');
  }
  await volunteer.deleteOne();
  res.json({ success: true, message: 'Volunteer deleted' });
});

module.exports = { getVolunteers, getVolunteerById, createVolunteer, updateVolunteer, deleteVolunteer };