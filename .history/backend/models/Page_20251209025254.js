const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: String,
  sections: [mongoose.Schema.Types.Mixed],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Page', PageSchema);
