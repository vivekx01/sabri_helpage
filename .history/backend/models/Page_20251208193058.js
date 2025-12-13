const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: String,
  content: String,
  type: String, // 'hero', 'content', 'cards', 'list', 'cta', etc.
  items: [{
    title: String,
    description: String,
    icon: String,
    imageUrl: String,
    year: String,
    organization: String
  }],
  buttons: [{
    text: String,
    link: String,
    action: String
  }],
  images: [String],
  order: Number,
  config: mongoose.Schema.Types.Mixed
});

const pageSchema = new mongoose.Schema({
  // Page Identification
  name: {
    type: String,
    required: true,
    enum: [
      'About', 'Contact', 'CSRSummit', 'Education', 'ElderlyCare',
      'GirlEducation', 'Home', 'ILC', 'Internship', 'MentalHealth',
      'News', 'Sociofare', 'Stories', 'Awards', 'Blog',
      'FAQ', 'Gallery', 'Privacy', 'Publications', 'Terms', 'Volunteer'
    ]
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  // Page Content (matches your React component props)
  pageTitle: String,
  pageSubtitle: String,
  heroImage: String,
  heroTitle: String,
  heroContent: String,

  // Dynamic Sections based on your components
  sections: [sectionSchema],

  // Page-specific data (for specific pages)
  awards: [{
    title: String,
    organization: String,
    description: String,
    year: String,
    icon: String
  }],

  blogs: [{
    title: String,
    excerpt: String,
    content: String,
    author: String,
    date: Date,
    imageUrl: String
  }],

  faqs: [{
    question: String,
    answer: String,
    category: String
  }],

  publications: [{
    title: String,
    type: String,
    fileUrl: String,
    description: String,
    date: Date
  }],

  events: [{
    title: String,
    description: String,
    date: Date,
    location: String,
    images: [String]
  }],

  // Status & Metadata
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  lastEdited: {
    type: Date,
    default: Date.now
  },
  lastEditedBy: String,
  seo: {
    title: String,
    description: String,
    keywords: [String]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Page', pageSchema);
