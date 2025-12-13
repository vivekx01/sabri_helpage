const express = require('express');
const router = express.Router();
const { getPageContent, getCauseContent, getTestimonials } = require('../controllers/contentController');

// Public read endpoints
router.get('/content/page/:slug', getPageContent);
router.get('/content/cause/:slug', getCauseContent);
router.get('/testimonials', getTestimonials);

module.exports = router;
