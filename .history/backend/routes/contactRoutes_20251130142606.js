const express = require('express');
const router = express.Router();
const { getContacts, getContactById, createContact, updateContact, deleteContact } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.get('/contacts', protect, getContacts);
router.get('/contacts/:id', protect, getContactById);
router.post('/contacts', createContact); // Public contact form
router.put('/contacts/:id', protect, updateContact);
router.delete('/contacts/:id', protect, deleteContact);

module.exports = router;
