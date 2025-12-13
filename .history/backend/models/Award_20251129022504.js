const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Award', awardSchema);