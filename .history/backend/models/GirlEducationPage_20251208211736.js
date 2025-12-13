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

const girlEducationPageSchema = new mongoose.Schema({
  name: { type: String, default: 'Girl Education' },
  slug: { type: String, default: 'girl-education' },
  hero: {
    title: { type: String, default: 'Empowering Girls Through Education' },
    backgroundImage: { type: String, default: '/images/girl-education/hero-bg.jpg' },
    overlayColor: { type: String, default: '#00000080' }
  },
  programs: [programSchema],
  impact: [impactSchema],
  gallery: gallerySchema
}, {
  timestamps: true
});

module.exports = mongoose.model('GirlEducationPage', girlEducationPageSchema);
