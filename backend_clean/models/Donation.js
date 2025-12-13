const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cause: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cause'
  },
  amount: { 
    type: Number, 
    required: true,
    min: 0
  },
  currency: { 
    type: String, 
    default: 'INR',
    uppercase: true
  },
  paymentMethod: { 
    type: String, 
    required: true,
    enum: ['credit_card', 'debit_card', 'net_banking', 'upi', 'wallet', 'other']
  },
  transactionId: { 
    type: String, 
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  isAnonymous: { 
    type: Boolean, 
    default: false 
  },
  message: {
    type: String,
    maxlength: 500
  },
  receiptSent: {
    type: Boolean,
    default: false
  },
  taxBenefitEligible: {
    type: Boolean,
    default: false
  },
  taxBenefitClaimed: {
    type: Boolean,
    default: false
  },
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
donationSchema.index({ donor: 1 });
donationSchema.index({ cause: 1 });
donationSchema.index({ status: 1 });
donationSchema.index({ createdAt: -1 });

// Virtual for formatted amount
donationSchema.virtual('formattedAmount').get(function() {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: this.currency || 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(this.amount);
});

// Pre-save hook
donationSchema.pre('save', async function(next) {
  if (this.isNew) {
    // Any pre-save logic can go here
  }
  next();
});

// Static methods
donationSchema.statics.getTotalDonations = async function(causeId) {
  const result = await this.aggregate([
    { $match: { 
      cause: causeId,
      status: 'completed'
    }},
    { $group: {
      _id: null,
      total: { $sum: '$amount' },
      count: { $sum: 1 }
    }}
  ]);
  
  return {
    total: result[0]?.total || 0,
    count: result[0]?.count || 0
  };
};

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;
