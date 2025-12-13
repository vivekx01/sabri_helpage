const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/published/:slug', pageController.getPageBySlug);

// Protected admin routes
router.use(authMiddleware);

router.get('/', pageController.getAllPages);
router.get('/stats', pageController.getPageStats);
router.post('/', pageController.createPage);
router.put('/:slug', pageController.updatePage);
router.patch('/:slug/status', pageController.updatePageStatus);
router.patch('/:pageSlug/sections/:sectionId', pageController.updateSection);
router.delete('/:slug', pageController.deletePage);

module.exports = router;
