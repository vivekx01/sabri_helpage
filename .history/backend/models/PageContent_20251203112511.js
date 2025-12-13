const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['heading', 'paragraph', 'list', 'image', 'cta'], required: true },
    text: { type: String },
    level: { type: Number },
    items: { type: [String], default: [] },
    imageUrl: { type: String },
    altText: { type: String },
    href: { type: String },
    label: { type: String },
  },
  { _id: false }
);

const pageContentSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, index: true, required: true },
    title: { type: String },
    eyebrow: { type: String },
    subtitle: { type: String },
    heroImage: { type: String },
    sections: { type: [blockSchema], default: [] },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PageContent', pageContentSchema);
