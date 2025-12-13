const asyncHandler = require('express-async-handler');
const { isCloudinaryConfigured } = require('../utils/multerConfig');

const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a file');
  }

  const fileUrl = isCloudinaryConfigured
    ? req.file.path
    : `/uploads/${req.file.filename}`;

  res.json({
    success: true,
    data: {
      url: fileUrl,
      filename: req.file.filename || req.file.originalname
    }
  });
});

module.exports = { uploadFile };