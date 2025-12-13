const express = require('express');
const router = express.Router();
const { getClubRegistrations, getClubRegistrationById, createClubRegistration, updateClubRegistration, deleteClubRegistration } = require('../controllers/clubController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

router.get('/clubs', protect, getClubRegistrations);
router.get('/clubs/:id', protect, getClubRegistrationById);
router.post('/clubs', createClubRegistration); // Public submission
router.put('/clubs/:id', protect, updateClubRegistration);
router.delete('/clubs/:id', protect, deleteClubRegistration);

module.exports = router;
