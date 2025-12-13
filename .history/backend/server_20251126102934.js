// Basic Express server setup with MongoDB connection
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// routers and middleware
const apixyzRouter = require('./routes/apixyz');
const apiRouter = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Sabri Helpage backend is running');
});

app.use('/apixyz', apixyzRouter);
app.use('/api', apiRouter);

// central error handler (registered after routes)
app.use(errorHandler);

const MONGO_URI = process.env.DB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/sabrihelpage';

async function start() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // run seeders if available
    try {
      const { seedTeachers } = require('./controllers/teacherController');
      const { seedAnimals } = require('./controllers/animalController');
      const { seeders } = require('./seed');
      // run seed functions if present
      if (typeof seedTeachers === 'function') await seedTeachers();
      if (typeof seedAnimals === 'function') await seedAnimals();
      if (seeders && Array.isArray(seeders)) {
        for (const s of seeders) {
          if (typeof s === 'function') await s();
        }
      }
    } catch (e) {
      // seeding is optional
      // console.log('Seeding skipped or not available');
    }

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();

