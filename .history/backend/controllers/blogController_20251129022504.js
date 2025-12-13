const asyncHandler = require('express-async-handler');
const Blog = require('../models/Blog');

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).sort({ publishedAt: -1 });
  res.json({ success: true, data: blogs });
});

const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }
  res.json({ success: true, data: blog });
});

const createBlog = asyncHandler(async (req, res) => {
  const { title, content, author, coverImage, tags } = req.body;
  
  if (!title || !content || !author) {
    res.status(400);
    throw new Error('Please provide required fields');
  }

  const blog = await Blog.create({
    title, content, author, coverImage, tags,
    createdBy: req.user._id
  });
  
  res.status(201).json({ success: true, data: blog });
});

const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }
  
  res.json({ success: true, data: blog });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }
  await blog.deleteOne();
  res.json({ success: true, message: 'Blog deleted' });
});

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };