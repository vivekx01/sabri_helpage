const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: Number, required: true },
  category: { type: String, required: true },
  organization: { type: String, required: true },
  recipient: { type: String },
  image: { type: String },
  certificateUrl: { type: String },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  slug: { type: String, unique: true }
}, {
  timestamps: true
});

// Create slug from title before saving
awardSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').trim('-');
  }
  next();
});

module.exports = mongoose.model('Award', awardSchema);
