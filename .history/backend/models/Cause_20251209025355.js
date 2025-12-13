const mongoose = require('mongoose');

const CauseSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: String,
  description: String,
  image: String,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cause', CauseSchema);
