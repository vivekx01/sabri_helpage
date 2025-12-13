const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  config: { type: mongoose.Schema.Types.Mixed }, // for config-based pages
  content: { type: mongoose.Schema.Types.Mixed }, // for content-based pages
}, { timestamps: true });

module.exports = mongoose.model('Page', PageSchema);
