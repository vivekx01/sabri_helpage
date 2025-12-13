const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true
  },
  phone: String,
  position: String,
  coverLetter: String,
  resumeUrl: String,
  status: {
    type: String,
    default: 'new'
  }
}, { timestamps: true });

module.exports = mongoose.model('Internship', InternshipSchema);
