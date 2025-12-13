const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  excerpt: { type: String },
  date: { type: Date, default: Date.now },
  author: { type: String },
  category: { type: String },
  featuredImage: { type: String },
  authorImage: { type: String },
  categoryIcon: { type: String },
  contentImages: [{ type: String }],
  gallery: [{ type: String }]
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },
  image: { type: String }
});

const blogPageSchema = new mongoose.Schema({
  name: { type: String, default: 'Blog' },
  slug: { type: String, default: 'blog' },
  config: {
    hero: {
      title: { type: String, default: 'Our Blog' },
      image: { type: String, default: '/images/blog/hero.jpg' },
      icon: { type: String, default: 'file-text' }
    },
    posts: [postSchema],
    categories: [categorySchema]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BlogPage', blogPageSchema);
