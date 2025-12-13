const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String },
  content: { type: String },
  image: { type: String },
  author: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', StorySchema, 'stories');
