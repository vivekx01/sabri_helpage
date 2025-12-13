const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const authMiddleware = require('../middleware/auth');


// Public routes
router.get('/published/:slug', pageController.getPageBySlug);

// Protected admin routes
router.use(authMiddleware);

router.get('/', pageController.getAllPages);
router.post('/', pageController.createPage);
router.post('/duplicate', pageController.duplicatePage);
router.put('/:slug', pageController.updatePage);
router.delete('/:slug', pageController.deletePage);

module.exports = router;
