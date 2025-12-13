const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'email', 'phone', 'address'
  icon: { type: String },
  value: { type: String, required: true },
  image: { type: String },
  mapImage: { type: String }
});

const formFieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String },
  required: { type: Boolean, default: false }
});

const contactPageSchema = new mongoose.Schema({
  name: { type: String, default: 'Contact' },
  slug: { type: String, default: 'contact' },
  hero: {
    title: { type: String, default: 'Get in Touch' },
    subtitle: { type: String, default: 'We\'d love to hear from you' },
    image: { type: String, default: '/images/contact-hero.jpg' }
  },
  contactInfo: [contactInfoSchema],
  form: {
    fields: [formFieldSchema],
    submitButton: {
      text: { type: String, default: 'Send Message' },
      icon: { type: String, default: 'send' }
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactPage', contactPageSchema);
