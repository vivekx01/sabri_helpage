// Basic Express server setup with MongoDB connection
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const apixyzRouter = require('./routes/apixyz');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Sabri Helpage backend is running');
});

app.use('/apixyz', apixyzRouter);

const MONGO_URI = process.env.DB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/sabrihelpage';

async function start() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // run seeders if collections empty
    const { seedTeachers } = require('./controllers/teacherController');
    const { seedAnimals } = require('./controllers/animalController');
    await seedTeachers();
    await seedAnimals();

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
