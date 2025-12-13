const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
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

const volunteerPageSchema = new mongoose.Schema({
  name: { type: String, default: 'Volunteer' },
  slug: { type: String, default: 'volunteer' },
  hero: {
    title: { type: String, default: 'Join Our Volunteer Community' },
    backgroundImage: { type: String, default: '/images/volunteer/hero-bg.jpg' },
    overlayColor: { type: String, default: '#00000080' }
  },
  opportunities: [opportunitySchema],
  impact: [impactSchema],
  gallery: gallerySchema
}, {
  timestamps: true
});

module.exports = mongoose.model('VolunteerPage', volunteerPageSchema);
