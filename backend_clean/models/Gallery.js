const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  description: String,
  coverImage: {
    url: String,
    alt: String
  },
  images: [{
    url: String,
    alt: String,
    caption: String,
    width: Number,
    height: Number
  }],
  categories: [{
    type: String,
    trim: true
  }],
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

gallerySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Gallery', gallerySchema);
