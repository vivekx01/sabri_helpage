const express = require('express');
const router = express.Router();
const { createContact, createSubscription, createDonation } = require('../controllers/servicesController');
const { getPageBySlug } = require('../controllers/pageController');

// Service routes
router.post('/contact', createContact);
router.post('/subscribe', createSubscription);
router.post('/donate', createDonation);

// Content routes
router.get('/causes', (req, res) => {
  req.params.slug = 'causes';
  return getPageBySlug(req, res);
});

router.get('/stories', (req, res) => {
  req.params.slug = 'stories';
  return getPageBySlug(req, res);
});

module.exports = router;
