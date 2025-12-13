const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },
  image: { type: String }
});

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }
});

const newsSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  excerpt: { type: String },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  featuredImage: { type: String },
  categoryIcon: { type: String },
  gallery: [{ type: String }],
  author: authorSchema
});

const archiveSchema = new mongoose.Schema({
  year: { type: String, required: true },
  icon: { type: String },
  coverImage: { type: String }
});

const newsPageSchema = new mongoose.Schema({
  name: { type: String, default: 'News' },
  slug: { type: String, default: 'news' },
  config: {
    hero: {
      title: { type: String, default: 'News & Updates' },
      image: { type: String, default: '/images/news/hero.jpg' },
      icon: { type: String, default: 'newspaper' }
    },
    categories: [categorySchema],
    featuredNews: [newsSchema],
    archives: [archiveSchema]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('NewsPage', newsPageSchema);
