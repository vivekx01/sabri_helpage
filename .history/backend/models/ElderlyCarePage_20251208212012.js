const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String },
  image: { type: String },
  features: [{ text: { type: String }, icon: { type: String } }]
});

const impactSchema = new mongoose.Schema({
  number: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String }
});

const gallerySchema = new mongoose.Schema({
  images: [{ src: { type: String }, alt: { type: String } }],
  videos: [{ url: { type: String }, thumbnail: { type: String } }]
});

const elderlyCarePageSchema = new mongoose.Schema({
  name: { type: String, default: 'Elderly Care' },
  slug: { type: String, default: 'elderly-care' },
  hero: {
    title: { type: String, default: 'Caring for Our Elders' },
    backgroundImage: { type: String, default: '/images/elderly-care/hero-bg.jpg' },
    overlayColor: { type: String, default: '#00000080' }
  },
  programs: [programSchema],
  impact: [impactSchema],
  gallery: gallerySchema
}, {
  timestamps: true
});

module.exports = mongoose.model('ElderlyCarePage', elderlyCarePageSchema);
