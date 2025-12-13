const express = require('express');
const router = express.Router();
const { createContact, listContacts } = require('../controllers/contactController');

// POST /api/contact
router.post('/contact', createContact);

// GET /api/contacts (admin/testing)
router.get('/contacts', listContacts);

module.exports = router;
