const asyncHandler = require('express-async-handler');
const Event = require('../models/Event');

const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).sort({ year: -1, month: -1 });
  res.json({ success: true, data: events });
});

const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }
  res.json({ success: true, data: event });
});

const createEvent = asyncHandler(async (req, res) => {
  const { title, description, year, month, images } = req.body;
  
  if (!title || !description || !year || !month) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const event = await Event.create({
    title, description, year, month, images,
    createdBy: req.user._id
  });
  
  res.status(201).json({ success: true, data: event });
});

const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }
  
  res.json({ success: true, data: event });
});

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }
  await event.deleteOne();
  res.json({ success: true, message: 'Event deleted' });
});

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent };