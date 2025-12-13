const express = require('express');
const router = express.Router();
const { getVolunteers, getVolunteerById, createVolunteer, updateVolunteer, deleteVolunteer } = require('../controllers/volunteerController');
const { protect } = require('../middleware/authMiddleware');

router.get('/volunteers', protect, getVolunteers);
router.get('/volunteers/:id', protect, getVolunteerById);
router.post('/volunteers', createVolunteer); // Public submission
router.put('/volunteers/:id', protect, updateVolunteer);
router.delete('/volunteers/:id', protect, deleteVolunteer);

module.exports = router;
