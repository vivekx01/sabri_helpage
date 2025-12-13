const express = require('express');
const router = express.Router();
const { getVolunteers, getVolunteerById, createVolunteer, updateVolunteer, deleteVolunteer } = require('../controllers/volunteerController');

router.get('/volunteers', getVolunteers);
router.get('/volunteers/:id', getVolunteerById);
router.post('/volunteers', createVolunteer);
router.put('/volunteers/:id', updateVolunteer);
router.delete('/volunteers/:id', deleteVolunteer);

module.exports = router;
