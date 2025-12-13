const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema(
  {
    logoUrl: { type: String },
    heroImages: { type: [String], default: [] },
    carouselImages: { type: [String], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteConfig', siteConfigSchema);