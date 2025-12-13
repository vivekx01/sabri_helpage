const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    college: { type: String, required: true },
    city: { type: String, required: true },
    status: {

      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  },
  { timestamps: true }
  
);

module.exports = mongoose.model('ClubRegistration', clubSchema);