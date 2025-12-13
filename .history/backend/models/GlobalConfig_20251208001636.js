const mongoose = require('mongoose');

const GlobalConfigSchema = new mongoose.Schema({
  // Site Information
  siteName: { type: String, default: 'Sabri Helpage' },
  tagline: String,
  logo: String,
  favicon: String,

  // Contact Information
  contact: {
    email: String,
    phone: String,
    telephone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    socialMedia: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String,
      youtube: String
    }
  },

  // Navigation Menu
  navigation: [{
    label: String,
    link: String,
    order: Number
  }],

  // Footer
  footer: {
    description: String,
    copyrightText: String,
    links: [{
      label: String,
      link: String
    }]
  },

  // Theme Colors
  theme: {
    primaryColor: { type: String, default: '#EB4C28' },
    secondaryColor: { type: String, default: '#FF7A42' },
    accentColor: { type: String, default: '#FFA500' }
  },

  // Homepage Content
  homepage: {
    hero: {
      title: String,
      subtitle: String,
      image: String,
      button1Text: String,
      button1Link: String,
      button2Text: String,
      button2Link: String
    },
    stats: {
      peopleHelped: String,
      happyLives: String,
      locations: String
    },
    videoId: String, // YouTube video ID
    supporters: [String]
  },

  // Dynamic Text Replacements (for any text on site)
  texts: {
    type: Map,
    of: String
  }

}, { timestamps: true });

module.exports = mongoose.model('GlobalConfig', GlobalConfigSchema);
