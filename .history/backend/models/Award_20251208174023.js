const mongoose = require('mongoose');

const AwardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  organization: String,
  year: Number,
  image: String,
  status: {
    type: String,
    default: 'published'
  }
}, { timestamps: true });

module.exports = mongoose.model('Award', AwardSchema);
