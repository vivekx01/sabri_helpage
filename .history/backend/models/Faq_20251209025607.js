const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
  question: String,
  answer: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Faq', FaqSchema);
