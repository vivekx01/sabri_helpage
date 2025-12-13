const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cause: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cause'
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  skills: [{
    type: String,
    trim: true
  }],
  interests: [{
    type: String,
    trim: true
  }],
  availability: {
    type: String,
    enum: ['weekdays', 'weekends', 'both', 'flexible'],
    default: 'flexible'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'on_hold', 'completed'],
    default: 'pending'
  },
  experience: {
    years: { type: Number, min: 0, default: 0 },
    description: String
  },
  availabilityDetails: {
    startDate: Date,
    endDate: Date,
    hoursPerWeek: Number
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
    email: String
  },
  backgroundCheck: {
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'approved', 'rejected'],
      default: 'not_started'
    },
    verifiedAt: Date,
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: String
  },
  notes: String,
  isActive: {
    type: Boolean,
    default: true
  },
  lastActive: Date,
  metadata: {
    ipAddress: String,
    userAgent: String,
    referrer: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
volunteerSchema.index({ user: 1 });
volunteerSchema.index({ cause: 1 });
volunteerSchema.index({ event: 1 });
volunteerSchema.index({ status: 1 });
volunteerSchema.index({ 'backgroundCheck.status': 1 });
volunteerSchema.index({ isActive: 1 });

// Virtual for volunteer's full profile
volunteerSchema.virtual('profile', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id',
  justOne: true
});

// Pre-save hook
volunteerSchema.pre('save', async function(next) {
  if (this.isNew) {
    // Any pre-save logic can go here
  }
  next();
});

// Static methods
volunteerSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$count' },
        byStatus: {
          $push: {
            status: '$_id',
            count: '$count'
          }
        }
      }
    }
  ]);

  return stats[0] || { total: 0, byStatus: [] };
};

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteer;
