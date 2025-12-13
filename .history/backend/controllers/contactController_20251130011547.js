const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  res.json({ success: true, data: contacts });
});

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  res.json({ success: true, data: contact });
});

const createContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Please provide required fields');
  }

  const contact = await Contact.create({
    name,
    email,
    subject,
    message
  });

  res.status(201).json({ success: true, data: contact });
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  
  res.json({ success: true, data: contact });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  await contact.deleteOne();
  res.json({ success: true, message: 'Contact deleted' });
});

module.exports = { getContacts, getContactById, createContact, updateContact, deleteContact };

