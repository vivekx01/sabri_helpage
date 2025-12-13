const mongoose = require('mongoose');

const csrSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    contactPerson: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    website: { type: String, trim: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    
    // CSR Details
    csrBudget: { type: Number },
    focusAreas: { type: [String], default: [] },
    proposalDetails: { type: String, required: true },
    expectedImpact: { type: String },
    duration: { type: String }, // "3 months", "6 months", "1 year", etc.
    
    // Documents
    documents: { type: [String], default: [] }, // Array of document URLs
    
    // Status workflow
    status: {
      type: String,
      enum: ['pending', 'under-review', 'approved', 'rejected', 'archived'],
      default: 'pending',
    },
    
    // Approval tracking
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: { type: Date },
    reviewNotes: { type: String },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedAt: { type: Date },
    rejectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rejectedAt: { type: Date },
    rejectionReason: { type: String },
    archivedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    archivedAt: { type: Date },
  },
  { timestamps: true }
);

// Index for faster queries
csrSchema.index({ status: 1, createdAt: -1 });
csrSchema.index({ companyName: 'text', contactPerson: 'text' });

module.exports = mongoose.model('CSR', csrSchema);
