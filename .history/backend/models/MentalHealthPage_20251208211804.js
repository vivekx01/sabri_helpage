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

const mentalHealthPageSchema = new mongoose.Schema({
  name: { type: String, default: 'Mental Health' },
  slug: { type: String, default: 'mental-health' },
  hero: {
    title: { type: String, default: 'Supporting Mental Health & Wellness' },
    backgroundImage: { type: String, default: '/images/mental-health/hero-bg.jpg' },
    overlayColor: { type: String, default: '#00000080' }
  },
  programs: [programSchema],
  impact: [impactSchema],
  gallery: gallerySchema
}, {
  timestamps: true
});

module.exports = mongoose.model('MentalHealthPage', mentalHealthPageSchema);
