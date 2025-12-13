/**
 * Universal Route Factory
 * Creates complete CRUD + Approval routes for any resource
 */

const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { hasRole, requirePermission } = require('../middleware/rbac');

/**
 * Create complete REST routes for a resource
 * @param {Object} controller - Controller with CRUD methods
 * @param {Object} permissions - Permission configuration
 */
const createResourceRoutes = (controller, permissions = {}) => {
  const router = express.Router();

  // Default permissions
  const {
    getAll = [],
    getOne = [],
    create = [],
    update = [],
    remove = ['super-admin', 'admin', 'manager'],
    approve = ['super-admin', 'admin', 'manager'],
    archive = ['super-admin', 'admin', 'manager'],
    bulk = ['super-admin', 'admin']
  } = permissions;

  // Statistics (if stats method exists)
  if (controller.getStats) {
    router.get('/stats', protect, controller.getStats);
  }

  // Bulk operations
  if (controller.bulkApprove) {
    router.post('/bulk/approve', protect, hasRole(...bulk), controller.bulkApprove);
  }
  if (controller.bulkArchive) {
    router.post('/bulk/archive', protect, hasRole(...bulk), controller.bulkArchive);
  }
  if (controller.bulkDelete) {
    router.post('/bulk/delete', protect, hasRole('super-admin', 'admin'), controller.bulkDelete);
  }

  // Single resource approval actions
  if (controller.approve) {
    router.patch('/:id/approve', protect, hasRole(...approve), controller.approve);
  }
  if (controller.reject) {
    router.patch('/:id/reject', protect, hasRole(...approve), controller.reject);
  }
  if (controller.archive) {
    router.patch('/:id/archive', protect, hasRole(...archive), controller.archive);
  }
  if (controller.unarchive) {
    router.patch('/:id/unarchive', protect, hasRole(...archive), controller.unarchive);
  }

  // Standard CRUD routes
  router.route('/')
    .get(
      getAll.length > 0 ? [protect, hasRole(...getAll)] : protect,
      controller.getAll
    )
    .post(
      create.length > 0 ? [protect, hasRole(...create)] : protect,
      controller.create
    );

  router.route('/:id')
    .get(
      getOne.length > 0 ? [protect, hasRole(...getOne)] : protect,
      controller.getById
    )
    .put(
      update.length > 0 ? [protect, hasRole(...update)] : protect,
      controller.update
    )
    .delete(
      protect,
      hasRole(...remove),
      controller.delete
    );

  return router;
};

/**
 * Create public routes (no authentication)
 */
const createPublicRoutes = (controller) => {
  const router = express.Router();

  router.get('/', controller.getAll);
  router.get('/:id', controller.getById);

  if (controller.getStats) {
    router.get('/stats', controller.getStats);
  }

  return router;
};

module.exports = {
  createResourceRoutes,
  createPublicRoutes
};
