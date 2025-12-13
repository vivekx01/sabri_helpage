const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: 'general' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  slug: { type: String, unique: true }
}, {
  timestamps: true
});

// Create slug from question before saving
faqSchema.pre('save', function(next) {
  if (this.isModified('question')) {
    this.slug = this.question.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').trim('-');
  }
  next();
});

module.exports = mongoose.model('Faq', faqSchema);
