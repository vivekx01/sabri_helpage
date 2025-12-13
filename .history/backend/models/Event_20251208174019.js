const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: Date,
  location: String,
  time: String,
  images: [String],
  tags: [String],
  status: {
    type: String,
    default: 'published'
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
