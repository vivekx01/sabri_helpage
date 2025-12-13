const express = require('express');
const router = express.Router();
const { getFaqs, getFaqById, createFaq, updateFaq, deleteFaq } = require('../controllers/faqController');

router.get('/faqs', getFaqs);
router.get('/faqs/:id', getFaqById);
router.post('/faqs', createFaq);
router.put('/faqs/:id', updateFaq);
router.delete('/faqs/:id', deleteFaq);

module.exports = router;
