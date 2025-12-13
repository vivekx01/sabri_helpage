const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'archived'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Internship', internshipSchema);