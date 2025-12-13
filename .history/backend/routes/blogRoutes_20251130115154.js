const express = require('express');
const router = express.Router();
const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');

router.get('/blog', getBlogs);
router.get('/blog/:id', getBlogById);
router.post('/blog', createBlog);
router.put('/blog/:id', updateBlog);
router.delete('/blog/:id', deleteBlog);

module.exports = router;
