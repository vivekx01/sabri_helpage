const mongoose = require('mongoose');

const csrSubmissionSchema = new mongoose.Schema(
  {
    organizationName: { 
      type: String, 
      required: [true, 'Organization name is required'],
      trim: true 
    },
    contactPerson: { 
      type: String, 
      required: [true, 'Contact person is required'],
      trim: true 
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    phone: { 
      type: String, 
      required: [true, 'Phone number is required'],
      trim: true 
    },
    proposalTitle: { 
      type: String, 
      required: [true, 'Proposal title is required'],
      trim: true 
    },
    proposalDescription: { 
      type: String, 
      required: [true, 'Proposal description is required'] 
    },
    budget: { 
      type: Number, 
      required: [true, 'Budget is required'],
      min: [0, 'Budget cannot be negative']
    },
    duration: { 
      type: String, 
      required: [true, 'Project duration is required'],
      trim: true 
    },
    focusArea: {
      type: String,
      enum: ['Education', 'Healthcare', 'Environment', 'Women Empowerment', 'Elderly Care', 'Mental Health', 'Other'],
      required: [true, 'Focus area is required']
    },
    proposalDocument: { 
      type: String, // URL to uploaded document
      required: false 
    },
    status: {
      type: String,
      enum: ['pending', 'under-review', 'approved', 'rejected', 'archived'],
      default: 'pending'
    },
    reviewNotes: { 
      type: String, 
      trim: true 
    },
    reviewedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    reviewedAt: { 
      type: Date 
    },
    submittedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for faster queries
csrSubmissionSchema.index({ status: 1, createdAt: -1 });
csrSubmissionSchema.index({ email: 1 });

// Virtual for formatted budget
csrSubmissionSchema.virtual('formattedBudget').get(function() {
  return `₹${this.budget.toLocaleString('en-IN')}`;
});

module.exports = mongoose.model('CSRSubmission', csrSubmissionSchema);
