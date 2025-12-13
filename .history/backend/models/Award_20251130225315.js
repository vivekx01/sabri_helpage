const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Award', awardSchema);