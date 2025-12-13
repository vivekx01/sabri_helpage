require('dotenv').config();
const mongoose = require('mongoose');
const Teacher = require('./models/Teacher');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ngo-db';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const seedTeachers = async () => {
  try {
    // Check if data already exists
    const count = await Teacher.countDocuments();
    
    if (count > 0) {
      console.log('Teachers collection already has data. Skipping seed.');
      return;
    }

    const teachers = [
      { name: 'Aisha Khan' },
      { name: 'Rohan Mehta' },
      { name: 'Sana Patel' },
      { name: 'Vikram Singh' },
      { name: 'Priya Sharma' },
    ];

    await Teacher.insertMany(teachers);
    console.log(`Successfully seeded ${teachers.length} teachers`);
  } catch (error) {
    console.error('Error seeding teachers:', error.message);
  }
};

const runSeed = async () => {

    await connectDB();
  await seedTeachers();
  await mongoose.disconnect();
  console.log('Seeding complete');
  process.exit(0);
};

runSeed();
