const express = require('express');
const router = express.Router();
const { getPageContent, updatePageContent, getCauseContent, getTestimonials, getPagesList } = require('../controllers/contentController');

// Public read endpoints
router.get('/content/page/:slug', getPageContent);
router.put('/content/page/:slug', updatePageContent);
router.get('/content/pages', getPagesList);
router.get('/content/cause/:slug', getCauseContent);
router.get('/testimonials', getTestimonials);

module.exports = router;
