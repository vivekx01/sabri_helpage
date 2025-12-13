const express = require('express');
const router = express.Router();
const { getVideos, getVideoById, createVideo, updateVideo, deleteVideo } = require('../controllers/videoController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

router.get('/videos', getVideos);
router.get('/videos/:id', getVideoById);
router.post('/videos', protect, permit('editor', 'manager', 'admin', 'super-admin'), createVideo);
router.put('/videos/:id', protect, permit('editor', 'manager', 'admin', 'super-admin'), updateVideo);
router.delete('/videos/:id', protect, permit('manager', 'admin', 'super-admin'), deleteVideo);

module.exports = router;
