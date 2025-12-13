const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Create uploads folder if not exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Check if Cloudinary is configured
const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

// Cloudinary storage
const cloudinaryImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'helpage/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
  }
});

const cloudinaryVideoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'helpage/videos',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'avi']
  }
});

const cloudinaryDocStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'helpage/documents',
    resource_type: 'raw',
    allowed_formats: ['pdf', 'doc', 'docx']
  }
});

// Local storage
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Upload instances
const uploadImage = multer({
  storage: isCloudinaryConfigured ? cloudinaryImageStorage : localStorage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

const uploadVideo = multer({
  storage: isCloudinaryConfigured ? cloudinaryVideoStorage : localStorage,
  limits: { fileSize: 50 * 1024 * 1024 }
});

const uploadPDF = multer({
  storage: isCloudinaryConfigured ? cloudinaryDocStorage : localStorage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

module.exports = { uploadImage, uploadVideo, uploadPDF, isCloudinaryConfigured };
