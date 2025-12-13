const mongoose = require('mongoose');

const causeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  featuredImage: {
    url: String,
    alt: String
  },
  gallery: [{
    url: String,
    alt: String,
    caption: String
  }],
  donationGoal: {
    amount: Number,
    currency: {
      type: String,
      default: 'INR'
    },
    currentAmount: {
      type: Number,
      default: 0
    }
  },
  impact: {
    beneficiaries: Number,
    locations: [String],
    achievements: [String]
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'upcoming'],
    default: 'active'
  },
  categories: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  meta: {
    volunteers: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    },
    donors: {
      type: Number,
      default: 0
    }
  }
});

causeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add text index for search functionality
causeSchema.index({
  title: 'text',
  shortDescription: 'text',
  description: 'text',
  'impact.locations': 'text',
  'impact.achievements': 'text',
  categories: 'text',
  tags: 'text'
});

module.exports = mongoose.model('Cause', causeSchema);
