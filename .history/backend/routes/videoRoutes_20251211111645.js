const express = require('express');
const router = express.Router();
const { getVideos, getVideoById, createVideo, updateVideo, deleteVideo } = require('../controllers/videoController');

router.get('/videos', getVideos);
router.get('/videos/:id', getVideoById);
router.post('/videos', createVideo);
router.put('/videos/:id', updateVideo);
router.delete('/videos/:id', deleteVideo);

module.exports = router;
