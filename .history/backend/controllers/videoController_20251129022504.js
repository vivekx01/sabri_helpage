const asyncHandler = require('express-async-handler');
const Video = require('../models/Video');

const getVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: -1 });
  res.json({ success: true, data: videos });
});

const getVideoById = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    res.status(404);
    throw new Error('Video not found');
  }
  res.json({ success: true, data: video });
});

const createVideo = asyncHandler(async (req, res) => {
  const { title, videoUrl } = req.body;
  
  if (!title || !videoUrl) {
    res.status(400);
    throw new Error('Please provide title and videoUrl');
  }

  const video = await Video.create({
    title, videoUrl,
    uploadedBy: req.user._id
  });
  
  res.status(201).json({ success: true, data: video });
});

const updateVideo = asyncHandler(async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!video) {
    res.status(404);
    throw new Error('Video not found');
  }
  
  res.json({ success: true, data: video });
});

const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    res.status(404);
    throw new Error('Video not found');
  }
  await video.deleteOne();
  res.json({ success: true, message: 'Video deleted' });
});

module.exports = { getVideos, getVideoById, createVideo, updateVideo, deleteVideo };