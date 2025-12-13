const express = require('express');
const router = express.Router();
const { getPublications, getPublicationById, createPublication, updatePublication, deletePublication } = require('../controllers/publicationController');

router.get('/publications', getPublications);
router.get('/publications/:id', getPublicationById);
router.post('/publications', createPublication);
router.put('/publications/:id', updatePublication);
router.delete('/publications/:id', deletePublication);

module.exports = router;
