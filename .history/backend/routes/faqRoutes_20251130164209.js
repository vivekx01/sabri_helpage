const express = require('express');
const router = express.Router();
const { getFaqs, getFaqById, createFaq, updateFaq, deleteFaq } = require('../controllers/faqController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

router.get('/faqs', getFaqs);
router.get('/faqs/:id', getFaqById);
router.post('/faqs', protect, permit('editor', 'manager', 'admin', 'super-admin'), createFaq);
router.put('/faqs/:id', protect, permit('editor', 'manager', 'admin', 'super-admin'), updateFaq);
router.delete('/faqs/:id', protect, permit('manager', 'admin', 'super-admin'), deleteFaq);

module.exports = router;
