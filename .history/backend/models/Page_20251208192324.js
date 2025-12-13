const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['header', 'content', 'image', 'gallery', 'form', 'list', 'cards', 'accordion', 'cta']
  },
  title: String,
  content: String,
  imageUrl: String,
  items: [{
    title: String,
    description: String,
    icon: String,
    imageUrl: String
  }],
  buttons: [{
    text: String,
    link: String,
    variant: String
  }],
  order: Number,
  config: mongoose.Schema.Types.Mixed
});

const pageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  sections: [sectionSchema],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  metadata: mongoose.Schema.Types.Mixed
});

pageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Page', pageSchema);
