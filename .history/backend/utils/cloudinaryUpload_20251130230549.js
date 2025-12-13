/**
 * Cloudinary File Upload Utility
 * Handles image and video uploads with validation
 */

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// File type validation
const FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'],
  VIDEO: ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'],
  DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

// File size limits (in bytes)
const SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  VIDEO: 100 * 1024 * 1024, // 100MB
  DOCUMENT: 10 * 1024 * 1024 // 10MB
};

/**
 * Create Cloudinary storage configuration
 */
const createStorage = (folder, resourceType = 'auto') => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `ngo/${folder}`,
      resource_type: resourceType,
      allowed_formats: resourceType === 'image' ? ['jpg', 'png', 'jpeg', 'webp', 'gif'] : 
                       resourceType === 'video' ? ['mp4', 'mpeg', 'mov', 'avi'] :
                       ['jpg', 'png', 'jpeg', 'webp', 'gif', 'mp4', 'mpeg', 'mov', 'pdf', 'doc', 'docx'],
      transformation: resourceType === 'image' ? [
        { width: 1200, height: 800, crop: 'limit', quality: 'auto' }
      ] : undefined
    },
  });
};

/**
 * File filter function
 */
const fileFilter = (allowedTypes) => {
  return (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`), false);
    }
  };
};

/**
 * Create multer upload middleware
 */
const createUploadMiddleware = (folder, options = {}) => {
  const {
    fileType = 'IMAGE',
    maxSize = SIZE_LIMITS.IMAGE,
    maxCount = 1,
    resourceType = 'auto'
  } = options;

  const storage = createStorage(folder, resourceType);
  const allowedTypes = FILE_TYPES[fileType] || FILE_TYPES.IMAGE;

  return multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter: fileFilter(allowedTypes)
  });
};

/**
 * Upload configurations for different resources
 */
const uploadConfigs = {
  // Logo upload (single image)
  logo: createUploadMiddleware('logos', {
    fileType: 'IMAGE',
    maxSize: SIZE_LIMITS.IMAGE,
    resourceType: 'image'
  }),

  // Hero images (multiple)
  heroImages: createUploadMiddleware('hero', {
    fileType: 'IMAGE',
    maxSize: SIZE_LIMITS.IMAGE,
    maxCount: 3,
    resourceType: 'image'
  }),

  // Blog cover images
  blogImages: createUploadMiddleware('blogs', {
    fileType: 'IMAGE',
    maxSize: SIZE_LIMITS.IMAGE,
    resourceType: 'image'
  }),

  // Story images
  storyImages: createUploadMiddleware('stories', {
    fileType: 'IMAGE',
    maxSize: SIZE_LIMITS.IMAGE,
    resourceType: 'image'
  }),

  // Event images (multiple)
  eventImages: createUploadMiddleware('events', {
    fileType: 'IMAGE',
    maxSize: SIZE_LIMITS.IMAGE,
    maxCount: 10,
    resourceType: 'image'
  }),

  // Videos
  videos: createUploadMiddleware('videos', {
    fileType: 'VIDEO',
    maxSize: SIZE_LIMITS.VIDEO,
    resourceType: 'video'
  }),

  // Awards
  awardImages: createUploadMiddleware('awards', {
    fileType: 'IMAGE',
    maxSize: SIZE_LIMITS.IMAGE,
    resourceType: 'image'
  }),

  // Publications (PDFs and images)
  publications: createUploadMiddleware('publications', {
    fileType: 'DOCUMENT',
    maxSize: SIZE_LIMITS.DOCUMENT,
    resourceType: 'auto'
  }),

  // CSR Proposals
  csrDocuments: createUploadMiddleware('csr', {
    fileType: 'DOCUMENT',
    maxSize: SIZE_LIMITS.DOCUMENT,
    resourceType: 'auto'
  }),

  // General files
  general: createUploadMiddleware('general', {
    fileType: 'IMAGE',
    maxSize: SIZE_LIMITS.IMAGE,
    resourceType: 'auto'
  })
};

/**
 * Delete file from Cloudinary
 */
const deleteFile = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete file from cloud storage');
  }
};

/**
 * Delete multiple files
 */
const deleteMultipleFiles = async (publicIds, resourceType = 'image') => {
  try {
    const deletePromises = publicIds.map(id => 
      cloudinary.uploader.destroy(id, { resource_type: resourceType })
    );
    const results = await Promise.all(deletePromises);
    return results;
  } catch (error) {
    console.error('Cloudinary bulk delete error:', error);
    throw new Error('Failed to delete files from cloud storage');
  }
};

/**
 * Get file info
 */
const getFileInfo = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.api.resource(publicId, {
      resource_type: resourceType
    });
    return result;
  } catch (error) {
    console.error('Cloudinary get file info error:', error);
    return null;
  }
};

/**
 * Helper: Extract public ID from Cloudinary URL
 */
const extractPublicId = (url) => {
  if (!url) return null;
  const matches = url.match(/\/v\d+\/(.+)\./);
  return matches ? matches[1] : null;
};

/**
 * Middleware: Handle upload errors
 */
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File size exceeds limit'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        error: 'Too many files'
      });
    }
  }
  
  if (err) {
    return res.status(400).json({
      success: false,
      error: err.message || 'File upload error'
    });
  }
  
  next();
};

module.exports = {
  cloudinary,
  uploadConfigs,
  createUploadMiddleware,
  deleteFile,
  deleteMultipleFiles,
  getFileInfo,
  extractPublicId,
  handleUploadError,
  FILE_TYPES,
  SIZE_LIMITS
};
