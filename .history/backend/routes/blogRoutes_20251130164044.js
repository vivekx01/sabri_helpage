const express = require('express');
const router = express.Router();
const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

// Use plural collection path: /api/blogs
router.get('/blogs', getBlogs);
router.get('/blogs/:id', getBlogById);
router.post('/blogs', protect, permit('editor', 'manager', 'admin', 'super-admin'), createBlog);
router.put('/blogs/:id', protect, permit('editor', 'manager', 'admin', 'super-admin'), updateBlog);
router.delete('/blogs/:id', protect, permit('manager', 'admin', 'super-admin'), deleteBlog);

module.exports = router;
