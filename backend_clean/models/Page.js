const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: mongoose.Schema.Types.Mixed,
  url: String,
  caption: String
}, { _id: false });

const PageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  header: String,
  sections: [SectionSchema],
  meta: {
    description: String,
    keywords: [String]
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Page', PageSchema);
