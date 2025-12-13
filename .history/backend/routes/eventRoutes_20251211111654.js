const express = require('express');
const router = express.Router();
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

router.get('/event', getEvents);
router.get('/event/:id', getEventById);
router.post('/event', createEvent);
router.put('/event/:id', updateEvent);
router.delete('/event/:id', deleteEvent);

module.exports = router;
