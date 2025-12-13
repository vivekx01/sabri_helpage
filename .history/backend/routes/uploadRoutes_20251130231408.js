const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { canManageSiteConfig, canEdit, hasRole, ROLES } = require('../middleware/rbac');
const {
  uploadImage,
  uploadHero,
  uploadLogo,
  uploadVideo,
  uploadDocument,
  deleteFile,
} = require('../utils/cloudinary');

// Upload single image (all authenticated users with editor+ role)
router.post('/upload/image', protect, hasRole(ROLES.EDITOR, ROLES.MANAGER, ROLES.ADMIN, ROLES.SUPER_ADMIN), uploadImage.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  res.json({
    success: true,
    url: req.file.path,
    publicId: req.file.filename,
    type: 'image',
  });
});

// Upload multiple images (for events, galleries)
router.post('/upload/images', protect, hasRole(ROLES.EDITOR, ROLES.MANAGER, ROLES.ADMIN, ROLES.SUPER_ADMIN), uploadImage.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, error: 'No files uploaded' });
  }

  const uploadedImages = req.files.map((file) => ({
    url: file.path,
    publicId: file.filename,
  }));

  res.json({
    success: true,
    images: uploadedImages,
    count: uploadedImages.length,
  });
});

// Upload hero section image (taller format) - Admin+ only
router.post('/upload/hero', protect, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN), uploadHero.single('hero'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  res.json({
    success: true,
    url: req.file.path,
    publicId: req.file.filename,
    type: 'hero',
  });
});

// Upload multiple hero images (3-image carousel) - Admin+ only
router.post('/upload/hero-carousel', protect, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN), uploadHero.array('heroImages', 3), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, error: 'No files uploaded' });
  }

  if (req.files.length > 3) {
    return res.status(400).json({ success: false, error: 'Maximum 3 images allowed for hero carousel' });
  }

  const uploadedImages = req.files.map((file) => ({
    url: file.path,
    publicId: file.filename,
  }));

  res.json({
    success: true,
    heroImages: uploadedImages,
    count: uploadedImages.length,
  });
});

// Upload logo - Admin+ only
router.post('/upload/logo', protect, hasRole(ROLES.ADMIN, ROLES.SUPER_ADMIN), uploadLogo.single('logo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  res.json({
    success: true,
    url: req.file.path,
    publicId: req.file.filename,
    type: 'logo',
  });
});

// Upload video - Editor+ access
router.post('/upload/video', protect, hasRole(ROLES.EDITOR, ROLES.MANAGER, ROLES.ADMIN, ROLES.SUPER_ADMIN), uploadVideo.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  res.json({
    success: true,
    url: req.file.path,
    publicId: req.file.filename,
    type: 'video',
    duration: req.file.duration,
  });
});

// Upload document (PDFs for publications, resumes) - Editor+ access
router.post('/upload/document', protect, hasRole(ROLES.EDITOR, ROLES.MANAGER, ROLES.ADMIN, ROLES.SUPER_ADMIN), uploadDocument.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  res.json({
    success: true,
    url: req.file.path,
    publicId: req.file.filename,
    type: 'document',
  });
});

// Delete file from Cloudinary - Manager+ access
router.delete('/upload/:publicId', protect, hasRole(ROLES.MANAGER, ROLES.ADMIN, ROLES.SUPER_ADMIN), async (req, res) => {
  try {
    const { publicId } = req.params;
    const { resourceType = 'image' } = req.query;

    const result = await deleteFile(publicId, resourceType);

    if (result.result === 'ok') {
      res.json({
        success: true,
        message: 'File deleted successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Failed to delete file',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
