const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: { type: String, enum: ['active', 'inactive', 'archived'], default: 'active' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Teacher', TeacherSchema, 'teachers');
