const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  category: String,
  order: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('FAQ', FAQSchema);
