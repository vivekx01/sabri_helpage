const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    year: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Publication', publicationSchema);