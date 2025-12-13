const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authors: [{ type: String }],
  publishDate: { type: Date, required: true },
  journal: { type: String },
  publisher: { type: String },
  doi: { type: String },
  url: { type: String },
  category: { type: String, default: 'research' },
  tags: [{ type: String }],
  image: { type: String },
  fileUrl: { type: String },
  isActive: { type: Boolean, default: true },
  slug: { type: String, unique: true }
}, {
  timestamps: true
});

// Create slug from title before saving
publicationSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').trim('-');
  }
  next();
});

module.exports = mongoose.model('Publication', publicationSchema);
