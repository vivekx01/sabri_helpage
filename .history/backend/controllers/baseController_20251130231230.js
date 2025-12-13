// Universal CRUD Controller with Approval System
const asyncHandler = require('express-async-handler');

// Generic function to create a controller for any model
const createController = (Model, modelName = 'Resource') => {
  // Get all resources with filtering and pagination
  const getAll = asyncHandler(async (req, res) => {
    const { status, page = 1, limit = 20, search, sortBy = 'createdAt', order = 'desc' } = req.query;

    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Model.countDocuments(query);
    const items = await Model.find(query)
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('createdBy uploadedBy', 'name email');

    res.json({
      success: true,
      data: items,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit),
      },
    });
  });

  // Get single resource by ID
  const getById = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id).populate('createdBy uploadedBy', 'name email');
    
    if (!item) {
      res.status(404);
      throw new Error(`${modelName} not found`);
    }

    res.json({ success: true, data: item });
  });

  // Create new resource
  const create = asyncHandler(async (req, res) => {
    const itemData = {
      ...req.body,
      createdBy: req.user._id,
      uploadedBy: req.user._id,
      status: req.body.status || 'draft',
    };

    const item = await Model.create(itemData);
    res.status(201).json({ success: true, data: item, message: `${modelName} created successfully` });
  });

  // Update resource
  const update = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);

    if (!item) {
      res.status(404);
      throw new Error(`${modelName} not found`);
    }

    const updated = await Model.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: updated, message: `${modelName} updated successfully` });
  });

  // Delete resource
  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);

    if (!item) {
      res.status(404);
      throw new Error(`${modelName} not found`);
    }

    await Model.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: `${modelName} deleted successfully` });
  });

  // Approve resource (pending → approved)
  const approve = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);

    if (!item) {
      res.status(404);
      throw new Error(`${modelName} not found`);
    }

    item.status = 'approved';
    item.approvedBy = req.user._id;
    item.approvedAt = Date.now();
    await item.save();

    res.json({ success: true, data: item, message: `${modelName} approved successfully` });
  });

  // Reject resource
  const reject = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);

    if (!item) {
      res.status(404);
      throw new Error(`${modelName} not found`);
    }

    item.status = 'rejected';
    item.rejectedBy = req.user._id;
    item.rejectedAt = Date.now();
    item.rejectionReason = req.body.reason || '';
    await item.save();

    res.json({ success: true, data: item, message: `${modelName} rejected` });
  });

  // Archive resource
  const archive = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);

    if (!item) {
      res.status(404);
      throw new Error(`${modelName} not found`);
    }

    item.status = 'archived';
    item.archivedBy = req.user._id;
    item.archivedAt = Date.now();
    await item.save();

    res.json({ success: true, data: item, message: `${modelName} archived successfully` });
  });

  // Publish resource (draft → published)
  const publish = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);

    if (!item) {
      res.status(404);
      throw new Error(`${modelName} not found`);
    }

    item.status = 'published';
    item.publishedBy = req.user._id;
    item.publishedAt = Date.now();
    await item.save();

    res.json({ success: true, data: item, message: `${modelName} published successfully` });
  });

  // Bulk actions
  const bulkAction = asyncHandler(async (req, res) => {
    const { ids, action } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      res.status(400);
      throw new Error('No IDs provided');
    }

    let updateData = {};
    switch (action) {
      case 'approve':
        updateData = { status: 'approved', approvedBy: req.user._id, approvedAt: Date.now() };
        break;
      case 'reject':
        updateData = { status: 'rejected', rejectedBy: req.user._id, rejectedAt: Date.now() };
        break;
      case 'archive':
        updateData = { status: 'archived', archivedBy: req.user._id, archivedAt: Date.now() };
        break;
      case 'publish':
        updateData = { status: 'published', publishedBy: req.user._id, publishedAt: Date.now() };
        break;
      case 'delete':
        await Model.deleteMany({ _id: { $in: ids } });
        return res.json({ success: true, message: `${ids.length} ${modelName}(s) deleted` });
      default:
        res.status(400);
        throw new Error('Invalid action');
    }

    const result = await Model.updateMany({ _id: { $in: ids } }, updateData);

    res.json({
      success: true,
      message: `${result.modifiedCount} ${modelName}(s) ${action}d`,
      modified: result.modifiedCount,
    });
  });

  return {
    getAll,
    getById,
    create,
    update,
    remove,
    approve,
    reject,
    archive,
    publish,
    bulkAction,
  };
};

module.exports = createController;
