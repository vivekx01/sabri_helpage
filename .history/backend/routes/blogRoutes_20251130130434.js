const express = require('express');
const router = express.Router();
const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

// Use plural collection path: /api/blogs
router.get('/blogs', getBlogs);
router.get('/blogs/:id', getBlogById);
router.post('/blogs', protect, createBlog);
router.put('/blogs/:id', protect, updateBlog);
router.delete('/blogs/:id', protect, deleteBlog);

module.exports = router;
