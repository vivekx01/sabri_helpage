require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const createAdminUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ngo-db');
    console.log('✅ Connected to MongoDB');

    // Check if users exist
    const superAdmin = await User.findOne({ email: 'superadmin@helpage.org' });
    const admin = await User.findOne({ email: 'admin@helpage.org' });

    // Create super admin if doesn't exist
    if (!superAdmin) {
      await User.create({
        name: 'Super Admin',
        email: 'superadmin@helpage.org',
        password: 'admin123',
        role: 'super-admin'
      });
      console.log('✅ Super Admin created: superadmin@helpage.org / admin123');
    } else {
      console.log('ℹ️  Super Admin already exists');
    }

    // Create admin if doesn't exist
    if (!admin) {
      await User.create({
        name: 'Admin User',
        email: 'admin@helpage.org',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Admin created: admin@helpage.org / admin123');
    } else {
      console.log('ℹ️  Admin already exists');
    }

    console.log('\n🎉 Admin users ready!');
    console.log('📍 Login at: http://localhost:5000/admin');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdminUsers();
