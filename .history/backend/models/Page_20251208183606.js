const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  title: String,
  subtitle: String,
  eyebrow: String,

  // Content Sections
  sections: [{
    sectionType: { type: String, required: true }, // 'text', 'image', 'cards', 'hero', 'stats'
    heading: String,
    subheading: String,
    content: String,
    image: String,
    images: [String],
    items: [mongoose.Schema.Types.Mixed],
    buttonText: String,
    buttonLink: String,
    customData: mongoose.Schema.Types.Mixed
  }],

  // About Page Specific
  aboutSections: [{
    type: String,
    text: String
  }],
  governingBody: [{
    name: String,
    paragraphs: [String]
  }],

  status: {
    type: String,
    default: 'published'
  }

}, { timestamps: true });

module.exports = mongoose.model('Page', PageSchema);
