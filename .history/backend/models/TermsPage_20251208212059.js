const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String },
  image: { type: String },
  content: { type: String, required: true }
});

const termsPageSchema = new mongoose.Schema({
  name: { type: String, default: 'Terms' },
  slug: { type: String, default: 'terms' },
  content: {
    hero: {
      title: { type: String, default: 'Terms of Service' },
      image: { type: String, default: '/images/terms/hero.jpg' },
      icon: { type: String, default: 'file-check' }
    },
    sections: [sectionSchema],
    contact: {
      image: { type: String, default: '/images/terms/contact.jpg' },
      icon: { type: String, default: 'mail' }
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TermsPage', termsPageSchema);
