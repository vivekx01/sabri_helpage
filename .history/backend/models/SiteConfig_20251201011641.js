const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema(
  {
    // Branding
    logoUrl: { type: String },

    // Media
    heroImages: { type: [String], default: [] },
    carouselImages: { type: [String], default: [] },
    galleryImages: { type: [String], default: [] },
    primaryVideoId: { type: String, default: '' }, // e.g., YouTube ID

    // Flexible content maps to capture existing frontend copy and images
    imageMap: {
      type: Map,
      of: String, // key -> image URL
      default: {},
    },
    texts: {
      type: Map,
      of: String, // key -> text content
      default: {},
    },
    socialLinks: [
      {
        label: { type: String },
        url: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteConfig', siteConfigSchema);