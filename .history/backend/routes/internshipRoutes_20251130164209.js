const express = require('express');
const router = express.Router();
const { getInternships, getInternshipById, createInternship, updateInternship, deleteInternship } = require('../controllers/internshipController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

router.get('/internships', protect, getInternships);
router.get('/internships/:id', protect, getInternshipById);
router.post('/internships', createInternship); // Public submission
router.put('/internships/:id', protect, updateInternship);
router.delete('/internships/:id', protect, deleteInternship);

module.exports = router;
