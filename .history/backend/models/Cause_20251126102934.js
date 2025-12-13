const mongoose = require('mongoose');

const CauseSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  priority: { type: Number, default: 0 }
});

module.exports = mongoose.model('Cause', CauseSchema, 'causes');
