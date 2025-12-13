const express = require('express');
const router = express.Router();
const { getClubRegistrations, getClubRegistrationById, createClubRegistration, updateClubRegistration, deleteClubRegistration } = require('../controllers/clubController');

router.get('/clubs', getClubRegistrations);
router.get('/clubs/:id', getClubRegistrationById);
router.post('/clubs', createClubRegistration);
router.put('/clubs/:id', updateClubRegistration);
router.delete('/clubs/:id', deleteClubRegistration);

module.exports = router;
