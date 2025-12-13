const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  image: { type: String },
  capacity: { type: Number },
  registeredCount: { type: Number, default: 0 },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
  category: { type: String, default: 'general' },
  organizer: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  requirements: { type: String },
  benefits: { type: String },
  slug: { type: String, unique: true }
}, {
  timestamps: true
});

// Create slug from title before saving
eventSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').trim('-');
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);
