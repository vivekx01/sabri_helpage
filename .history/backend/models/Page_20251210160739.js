const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  type: String,
  title: String,
  content: String,
  order: Number,
  items: [mongoose.Schema.Types.Mixed],
  formFields: [mongoose.Schema.Types.Mixed],
  submitText: String,
});

const StatSchema = new mongoose.Schema({
  value: String,
  label: String,
  icon: String,
});

const PageSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  pageTitle: String,
  heroTitle: String,
  heroContent: String,
  heroImage: String,
  sections: [SectionSchema],
  stats: [StatSchema],
  status: String,
  seoTitle: String,
  seoDescription: String,
});

module.exports = mongoose.model('Page', PageSchema);
