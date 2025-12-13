const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  avatar: { type: String },
  companyLogo: { type: String }
});

const agendaSchema = new mongoose.Schema({
  time: { type: String, required: true },
  title: { type: String, required: true },
  icon: { type: String },
  speakerPhoto: { type: String }
});

const gallerySchema = new mongoose.Schema({
  image: { type: String, required: true },
  caption: { type: String }
});

const sponsorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  tier: { type: String, default: 'general' }
});

const csrSummitPageSchema = new mongoose.Schema({
  name: { type: String, default: 'CSR Summit' },
  slug: { type: String, default: 'csr-summit' },
  hero: {
    title: { type: String, default: 'Annual CSR & Social Impact Summit 2024' },
    subtitle: { type: String, default: 'Join industry leaders...' },
    backgroundImage: { type: String, default: '/images/csr-summit/hero-bg.jpg' },
    overlayImage: { type: String, default: '/images/csr-summit/overlay.png' }
  },
  speakers: [speakerSchema],
  agenda: [agendaSchema],
  gallery: [gallerySchema],
  sponsors: [sponsorSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('CSRSummitPage', csrSummitPageSchema);
