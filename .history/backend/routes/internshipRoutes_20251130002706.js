const express = require('express');
const router = express.Router();
const { getInternships, getInternshipById, createInternship, updateInternship, deleteInternship } = require('../controllers/internshipController');

router.get('/internships', getInternships);
router.get('/internships/:id', getInternshipById);
router.post('/internships', createInternship);
router.put('/internships/:id', updateInternship);
router.delete('/internships/:id', deleteInternship);

module.exports = router;
