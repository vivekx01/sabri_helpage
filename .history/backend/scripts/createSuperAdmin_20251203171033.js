require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const createSuperAdmin = async () => {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/sabrihelpage';
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');

    const existingSuperAdmin = await User.findOne({ role: 'super-admin' });

    if (existingSuperAdmin) {
      console.log('⚠️  Super admin already exists');
      console.log(`Email: ${existingSuperAdmin.email}`);
      process.exit(0);
    }

    const superAdmin = await User.create({
      name: 'Super Admin',
      email: 'superadmin@helpage.org',
      password: 'admin123',
      role: 'super-admin'
    });

    console.log('✅ Super Admin created!');
    console.log(`Email: ${superAdmin.email}`);
    console.log('Password: admin123');
    console.log('⚠️  Change password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createSuperAdmin();
