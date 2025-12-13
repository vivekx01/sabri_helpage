const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: String,
  excerpt: String,
  content: String,
  author: String,
  featuredImage: String,
  tags: [String],
  status: {
    type: String,
    default: 'published'
  }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
