import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'manager', 'super_admin'],
    default: 'admin'
  }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
