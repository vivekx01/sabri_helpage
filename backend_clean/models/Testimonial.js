const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  author: {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    organization: { type: String, trim: true },
    image: {
      url: String,
      alt: String
    }
  },
  content: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 2000
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be a whole number between 1 and 5'
    }
  },
  type: {
    type: String,
    enum: ['donor', 'volunteer', 'beneficiary', 'partner', 'other'],
    default: 'other'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  source: {
    type: String,
    enum: ['website', 'social_media', 'email', 'in_person', 'other'],
    default: 'website'
  },
  location: {
    city: String,
    country: String
  },
  metadata: {
    ipAddress: String,
    userAgent: String,
    referrer: String
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date,
  rejectionReason: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
testimonialSchema.index({ 'author.name': 'text', content: 'text' });
testimonialSchema.index({ isFeatured: 1 });
testimonialSchema.index({ status: 1 });
testimonialSchema.index({ type: 1 });
testimonialSchema.index({ rating: 1 });

// Virtual for formatted date
testimonialSchema.virtual('date').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Pre-save hook
testimonialSchema.pre('save', function(next) {
  // If status is being updated to approved, set approvedAt
  if (this.isModified('status') && this.status === 'approved') {
    this.approvedAt = new Date();
  }
  next();
});

// Static methods
testimonialSchema.statics.getFeatured = async function(limit = 5) {
  return this.find({ 
    status: 'approved',
    isFeatured: true 
  })
  .sort({ approvedAt: -1 })
  .limit(parseInt(limit));
};

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
module.exports = Testimonial;
