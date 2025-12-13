/**
 * Universal Controller with CRUD + Approval System
 * Provides: Create, Read, Update, Delete, Approve, Archive, Bulk Actions
 */

const asyncHandler = require('express-async-handler');

/**
 * Create a universal controller for any model
 * @param {Model} Model - Mongoose model
 * @param {string} resourceName - Name for error messages
 */
const createUniversalController = (Model, resourceName = 'Resource') => {
  return {
    /**
     * @desc    Get all resources with filters
     * @route   GET /api/resource
     * @access  Based on RBAC
     */
    getAll: asyncHandler(async (req, res) => {
      const { status, page = 1, limit = 20, sort = '-createdAt', search } = req.query;
      
      // Build query
      const query = {};
      if (status) query.status = status;
      
      // Search across text fields
      if (search) {
        const searchFields = Object.keys(Model.schema.paths).filter(key => 
          Model.schema.paths[key].instance === 'String'
        );
        query.$or = searchFields.map(field => ({
          [field]: { $regex: search, $options: 'i' }
        }));
      }
      
      // Execute query with pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const [data, total] = await Promise.all([
        Model.find(query)
          .sort(sort)
          .limit(parseInt(limit))
          .skip(skip)
          .populate('createdBy', 'name email')
          .populate('reviewedBy', 'name email'),
        Model.countDocuments(query)
      ]);
      
      res.json({
        success: true,
        data,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      });
    }),

    /**
     * @desc    Get single resource by ID
     * @route   GET /api/resource/:id
     * @access  Based on RBAC
     */
    getById: asyncHandler(async (req, res) => {
      const resource = await Model.findById(req.params.id)
        .populate('createdBy', 'name email role')
        .populate('reviewedBy', 'name email role');
      
      if (!resource) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      
      res.json({
        success: true,
        data: resource
      });
    }),

    /**
     * @desc    Create new resource
     * @route   POST /api/resource
     * @access  Based on RBAC
     */
    create: asyncHandler(async (req, res) => {
      // Add creator info if user is authenticated
      if (req.user) {
        req.body.createdBy = req.user._id;
      }
      
      const resource = await Model.create(req.body);
      
      res.status(201).json({
        success: true,
        message: `${resourceName} created successfully`,
        data: resource
      });
    }),

    /**
     * @desc    Update resource
     * @route   PUT /api/resource/:id
     * @access  Based on RBAC
     */
    update: asyncHandler(async (req, res) => {
      const resource = await Model.findById(req.params.id);
      
      if (!resource) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      
      const updated = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      
      res.json({
        success: true,
        message: `${resourceName} updated successfully`,
        data: updated
      });
    }),

    /**
     * @desc    Delete resource
     * @route   DELETE /api/resource/:id
     * @access  Based on RBAC (Admin/Manager only)
     */
    delete: asyncHandler(async (req, res) => {
      const resource = await Model.findById(req.params.id);
      
      if (!resource) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      
      await Model.findByIdAndDelete(req.params.id);
      
      res.json({
        success: true,
        message: `${resourceName} deleted successfully`
      });
    }),

    /**
     * @desc    Approve resource
     * @route   PATCH /api/resource/:id/approve
     * @access  Based on RBAC (Admin/Manager only)
     */
    approve: asyncHandler(async (req, res) => {
      const resource = await Model.findById(req.params.id);
      
      if (!resource) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      
      resource.status = 'approved';
      if (req.user) {
        resource.reviewedBy = req.user._id;
        resource.reviewedAt = new Date();
      }
      if (req.body.reviewNotes) {
        resource.reviewNotes = req.body.reviewNotes;
      }
      
      await resource.save();
      
      res.json({
        success: true,
        message: `${resourceName} approved successfully`,
        data: resource
      });
    }),

    /**
     * @desc    Reject resource
     * @route   PATCH /api/resource/:id/reject
     * @access  Based on RBAC (Admin/Manager only)
     */
    reject: asyncHandler(async (req, res) => {
      const resource = await Model.findById(req.params.id);
      
      if (!resource) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      
      resource.status = 'rejected';
      if (req.user) {
        resource.reviewedBy = req.user._id;
        resource.reviewedAt = new Date();
      }
      if (req.body.reviewNotes) {
        resource.reviewNotes = req.body.reviewNotes;
      }
      
      await resource.save();
      
      res.json({
        success: true,
        message: `${resourceName} rejected`,
        data: resource
      });
    }),

    /**
     * @desc    Archive resource
     * @route   PATCH /api/resource/:id/archive
     * @access  Based on RBAC (Admin/Manager only)
     */
    archive: asyncHandler(async (req, res) => {
      const resource = await Model.findById(req.params.id);
      
      if (!resource) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      
      resource.status = 'archived';
      await resource.save();
      
      res.json({
        success: true,
        message: `${resourceName} archived successfully`,
        data: resource
      });
    }),

    /**
     * @desc    Unarchive resource
     * @route   PATCH /api/resource/:id/unarchive
     * @access  Based on RBAC (Admin/Manager only)
     */
    unarchive: asyncHandler(async (req, res) => {
      const resource = await Model.findById(req.params.id);
      
      if (!resource) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      
      resource.status = 'draft';
      await resource.save();
      
      res.json({
        success: true,
        message: `${resourceName} unarchived successfully`,
        data: resource
      });
    }),

    /**
     * @desc    Bulk approve resources
     * @route   POST /api/resource/bulk/approve
     * @access  Based on RBAC (Admin/Manager only)
     */
    bulkApprove: asyncHandler(async (req, res) => {
      const { ids } = req.body;
      
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        res.status(400);
        throw new Error('Please provide array of IDs');
      }
      
      const updateData = {
        status: 'approved',
        reviewedAt: new Date()
      };
      if (req.user) {
        updateData.reviewedBy = req.user._id;
      }
      
      const result = await Model.updateMany(
        { _id: { $in: ids } },
        updateData
      );
      
      res.json({
        success: true,
        message: `${result.modifiedCount} ${resourceName}(s) approved`,
        modifiedCount: result.modifiedCount
      });
    }),

    /**
     * @desc    Bulk archive resources
     * @route   POST /api/resource/bulk/archive
     * @access  Based on RBAC (Admin/Manager only)
     */
    bulkArchive: asyncHandler(async (req, res) => {
      const { ids } = req.body;
      
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        res.status(400);
        throw new Error('Please provide array of IDs');
      }
      
      const result = await Model.updateMany(
        { _id: { $in: ids } },
        { status: 'archived' }
      );
      
      res.json({
        success: true,
        message: `${result.modifiedCount} ${resourceName}(s) archived`,
        modifiedCount: result.modifiedCount
      });
    }),

    /**
     * @desc    Bulk delete resources
     * @route   POST /api/resource/bulk/delete
     * @access  Based on RBAC (Super Admin/Admin only)
     */
    bulkDelete: asyncHandler(async (req, res) => {
      const { ids } = req.body;
      
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        res.status(400);
        throw new Error('Please provide array of IDs');
      }
      
      const result = await Model.deleteMany({ _id: { $in: ids } });
      
      res.json({
        success: true,
        message: `${result.deletedCount} ${resourceName}(s) deleted`,
        deletedCount: result.deletedCount
      });
    }),

    /**
     * @desc    Get statistics
     * @route   GET /api/resource/stats
     * @access  Based on RBAC
     */
    getStats: asyncHandler(async (req, res) => {
      const stats = await Model.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);
      
      const total = await Model.countDocuments();
      
      const statusMap = stats.reduce((acc, curr) => {
        acc[curr._id || 'unknown'] = curr.count;
        return acc;
      }, {});
      
      res.json({
        success: true,
        data: {
          total,
          byStatus: statusMap
        }
      });
    })
  };
};

module.exports = createUniversalController;
