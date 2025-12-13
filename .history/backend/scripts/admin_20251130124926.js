require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ngo-db';

async function run() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('MongoDB connected');

    const name = process.env.SEED_ADMIN_NAME || 'Super Admin';
    const email = process.env.SEED_ADMIN_EMAIL || 'superadmin@example.com';
    const password = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!';

    let user = await User.findOne({ email }).select('+password');
    if (!user) {
      user = new User({ name, email, password, role: 'super-admin' });
      await user.save();
      console.log(`Created super-admin: ${email}`);
    } else {
      // Optionally update password/role if needed
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
      user.role = 'super-admin';
      await user.save();
      console.log(`Updated super-admin credentials: ${email}`);
    }

    console.log('Seed complete. Admin user id:', user._id.toString());
  } catch (err) {
    console.error('Seed error:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

run();
