const express = require('express');
const router = express.Router();
const { getPublications, getPublicationById, createPublication, updatePublication, deletePublication } = require('../controllers/publicationController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

router.get('/publications', getPublications);
router.get('/publications/:id', getPublicationById);
router.post('/publications', protect, permit('editor', 'manager', 'admin', 'super-admin'), createPublication);
router.put('/publications/:id', protect, permit('editor', 'manager', 'admin', 'super-admin'), updatePublication);
router.delete('/publications/:id', protect, permit('manager', 'admin', 'super-admin'), deletePublication);

module.exports = router;
