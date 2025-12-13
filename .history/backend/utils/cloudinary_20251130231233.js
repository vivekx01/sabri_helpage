const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'your-cloud-name',
  api_key: process.env.CLOUDINARY_API_KEY || 'your-api-key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'your-api-secret',
});

// Image storage configuration
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ngo-helpage/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }],
  },
});

// Hero image storage (taller images)
const heroStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ngo-helpage/hero',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1920, height: 1080, crop: 'limit' }],
  },
});

// Logo storage
const logoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ngo-helpage/logo',
    allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

// Video storage
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ngo-helpage/videos',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'avi', 'webm'],
  },
});

// Document storage (PDFs for publications)
const documentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ngo-helpage/documents',
    resource_type: 'raw',
    allowed_formats: ['pdf', 'doc', 'docx'],
  },
});

// Multer upload instances
const uploadImage = multer({ storage: imageStorage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB
const uploadHero = multer({ storage: heroStorage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB
const uploadLogo = multer({ storage: logoStorage, limits: { fileSize: 2 * 1024 * 1024 } }); // 2MB
const uploadVideo = multer({ storage: videoStorage, limits: { fileSize: 100 * 1024 * 1024 } }); // 100MB
const uploadDocument = multer({ storage: documentStorage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

// Delete file from Cloudinary
const deleteFile = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
};

// Get optimized URL
const getOptimizedUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: 'auto',
    ...options,
  });
};

module.exports = {
  cloudinary,
  uploadImage,
  uploadHero,
  uploadLogo,
  uploadVideo,
  uploadDocument,
  deleteFile,
  getOptimizedUrl,
};
