const mongoose = require('mongoose');

const CauseSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  eyebrow: String,
  description: String,
  bannerImage: String,
  icon: String,

  // Content Blocks
  contentBlocks: [{
    type: String, // 'heading', 'paragraph', 'list', 'image', 'cta'
    level: Number, // For headings: 1, 2, 3
    text: String,
    items: [String],
    imageUrl: String,
    altText: String,
    href: String,
    label: String,
    italic: Boolean
  }],

  status: {
    type: String,
    default: 'published'
  },
  order: Number

}, { timestamps: true });

module.exports = mongoose.model('Cause', CauseSchema);
