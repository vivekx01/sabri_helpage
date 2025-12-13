// Simple seed runner that connects and runs seeders
require('dotenv').config();
const mongoose = require('mongoose');
const { seedTeachers } = require('./controllers/teacherController');
const { seedAnimals } = require('./controllers/animalController');

const MONGO_URI = process.env.DB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/sabrihelpage';

async function run() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding');

    await seedTeachers();
    await seedAnimals();

    await mongoose.disconnect();
    console.log('Seeding complete');
  } catch (err) {
    console.error('Seeding error', err);
    process.exit(1);
  }
}

run();
