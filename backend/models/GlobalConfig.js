const mongoose = require('mongoose');

const globalConfigSchema = new mongoose.Schema({
  siteTitle: { type: String, default: 'Sabri Helpage' },
  siteDescription: { type: String, default: 'NGO for elderly care and social welfare' },
  contactEmail: { type: String, default: 'info@sabrihelpage.com' },
  contactPhone: { type: String, default: '+91-XXXXXXXXXX' },
  address: { type: String, default: 'Your Address Here' },
  socialLinks: {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' }
  },
  heroSection: {
    title: { type: String, default: 'Welcome to Sabri Helpage' },
    subtitle: { type: String, default: 'Making a difference in elderly care' },
    backgroundImage: { type: String, default: '' }
  },
  aboutSection: {
    title: { type: String, default: 'About Us' },
    content: { type: String, default: 'We are dedicated to providing care and support to the elderly community.' }
  },
  features: [{
    title: { type: String },
    description: { type: String },
    icon: { type: String }
  }],
  footerText: { type: String, default: '© 2024 Sabri Helpage. All rights reserved.' }
}, {
  timestamps: true
});

module.exports = mongoose.model('GlobalConfig', globalConfigSchema);
