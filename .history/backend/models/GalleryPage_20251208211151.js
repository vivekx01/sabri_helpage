const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: String },
  thumbnail: { type: String },
  eventId: { type: String },
  eventImage: { type: String }
});

const albumSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  coverImage: { type: String },
  images: [imageSchema],
  event: {
    title: { type: String },
    images: [{ type: String }]
  }
});

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  images: [{ type: String }],
  coverImage: { type: String }
});

const galleryPageSchema = new mongoose.Schema({
  name: { type: String, default: 'Gallery' },
  slug: { type: String, default: 'gallery' },
  config: {
    hero: {
      title: { type: String, default: 'Photo Gallery' },
      image: { type: String, default: '/images/gallery/hero.jpg' },
      icon: { type: String, default: 'image' }
    },
    albums: [albumSchema],
    featured: [{
      image: { type: String },
      caption: { type: String },
      thumbnail: { type: String }
    }],
    events: [eventSchema]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GalleryPage', galleryPageSchema);
