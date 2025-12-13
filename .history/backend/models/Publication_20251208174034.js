const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  type: String, // 'PDF', 'Report', 'Newsletter'
  fileUrl: String,
  thumbnailUrl: String,
  publishDate: Date,
  status: {
    type: String,
    default: 'published'
  }
}, { timestamps: true });

module.exports = mongoose.model('Publication', PublicationSchema);
