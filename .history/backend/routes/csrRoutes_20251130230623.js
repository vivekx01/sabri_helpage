const express = require('express');
const router = express.Router();
const CSRSubmission = require('../models/CSRSubmission');
const createUniversalController = require('../controllers/universalController');
const { createResourceRoutes } = require('../utils/routeFactory');
const { protect } = require('../middleware/authMiddleware');
const { hasRole } = require('../middleware/rbac');
const { uploadConfigs, handleUploadError } = require('../utils/cloudinaryUpload');

// Create controller
const csrController = createUniversalController(CSRSubmission, 'CSR Submission');

// Special route: Submit CSR (public or authenticated)
router.post(
  '/submit',
  uploadConfigs.csrDocuments.single('proposalDocument'),
  handleUploadError,
  async (req, res) => {
    try {
      const csrData = {
        ...req.body,
        proposalDocument: req.file ? req.file.path : undefined,
        submittedBy: req.user ? req.user._id : undefined,
        status: 'pending'
      };

      const submission = await CSRSubmission.create(csrData);

      res.status(201).json({
        success: true,
        message: 'CSR proposal submitted successfully. You will be contacted soon.',
        data: submission
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
);

// Create resource routes with permissions
const resourceRoutes = createResourceRoutes(csrController, {
  getAll: ['super-admin', 'admin', 'manager'],
  getOne: ['super-admin', 'admin', 'manager'],
  create: ['super-admin', 'admin', 'manager'],
  update: ['super-admin', 'admin', 'manager'],
  remove: ['super-admin', 'admin'],
  approve: ['super-admin', 'admin', 'manager'],
  archive: ['super-admin', 'admin', 'manager'],
  bulk: ['super-admin', 'admin']
});

// Mount resource routes
router.use('/', resourceRoutes);

module.exports = router;
