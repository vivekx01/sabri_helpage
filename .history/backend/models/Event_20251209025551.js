const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  location: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', EventSchema);
