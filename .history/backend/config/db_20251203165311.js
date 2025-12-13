const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || // primary expected env
      process.env.MONGO_URI || // legacy fallback
      'mongodb://localhost:27017/sabrihelpage';

    await mongoose.connect(mongoURI);

    console.log('✅ MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    return false;
  }
};

module.exports = connectDB;
