const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: 'General' },
  icon: { type: String },
  order: { type: Number, default: 0 }
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },
  description: { type: String }
});

const faqPageSchema = new mongoose.Schema({
  name: { type: String, default: 'FAQ' },
  slug: { type: String, default: 'faq' },
  config: {
    hero: {
      title: { type: String, default: 'Frequently Asked Questions' },
      image: { type: String, default: '/images/faq/hero.jpg' },
      icon: { type: String, default: 'help-circle' }
    },
    categories: [categorySchema],
    faqs: [faqSchema]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FAQPage', faqPageSchema);
