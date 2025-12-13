const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  excerpt: String,
  content: String,
  image: String,
  category: String,
  author: String,
  date: {
    type: Date,
    default: Date.now
  },
  read_time: String,
  status: {
    type: String,
    default: 'published'
  }
}, { timestamps: true });

module.exports = mongoose.model('Story', StorySchema);
