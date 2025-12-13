const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    year: { type: Number, required: true },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Publication', publicationSchema);