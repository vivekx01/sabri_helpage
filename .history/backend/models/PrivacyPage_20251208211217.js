const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String },
  image: { type: String },
  content: { type: String, required: true }
});

const privacyPageSchema = new mongoose.Schema({
  name: { type: String, default: 'Privacy' },
  slug: { type: String, default: 'privacy' },
  content: {
    hero: {
      title: { type: String, default: 'Privacy Policy' },
      image: { type: String, default: '/images/privacy/hero.jpg' },
      icon: { type: String, default: 'shield' }
    },
    sections: [sectionSchema],
    contact: {
      image: { type: String, default: '/images/privacy/contact.jpg' },
      icon: { type: String, default: 'mail' }
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PrivacyPage', privacyPageSchema);
