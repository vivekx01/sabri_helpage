const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  requirements: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Internship', InternshipSchema);
