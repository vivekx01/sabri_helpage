const express = require('express');
const router = express.Router();
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

router.get('/events', getEvents);
router.get('/events/:id', getEventById);
router.post('/events', protect, permit('editor', 'manager', 'admin', 'super-admin'), createEvent);
router.put('/events/:id', protect, permit('editor', 'manager', 'admin', 'super-admin'), updateEvent);
router.delete('/events/:id', protect, permit('manager', 'admin', 'super-admin'), deleteEvent);

module.exports = router;
