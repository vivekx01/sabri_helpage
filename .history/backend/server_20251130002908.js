require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import all routes
const teacherRoutes = require('./routes/teacherRoutes');
const contactRoutes = require('./routes/contactRoutes');
const blogRoutes = require('./routes/blogRoutes');
const storyRoutes = require('./routes/storyRoutes');
const eventRoutes = require('./routes/eventRoutes');
const awardRoutes = require('./routes/awardRoutes');
const faqRoutes = require('./routes/faqRoutes');
const publicationRoutes = require('./routes/publicationRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const donorRoutes = require('./routes/donorRoutes');
const videoRoutes = require('./routes/videoRoutes');
const clubRoutes = require('./routes/clubRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// ---------------------------
// PORT CONFIGURATION
// ---------------------------
const PORT = process.env.PORT || 5000;

// ---------------------------
// MIDDLEWARE
// ---------------------------
app.use(cors());
app.use(express.json());

// ---------------------------
// HEALTH CHECK
// ---------------------------
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'NGO Backend API is running',
  });
});

// ---------------------------
// DEMO ROUTE
// ---------------------------
app.get('/api/animals', (req, res) => {
  res.json({
    success: true,
    data: ['dog', 'cat', 'lion'],
  });
});

// ---------------------------
// ROUTES
// ---------------------------
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', teacherRoutes);
app.use('/api', contactRoutes);
app.use('/api', blogRoutes);
app.use('/api', storyRoutes);
app.use('/api', eventRoutes);
app.use('/api', awardRoutes);
app.use('/api', faqRoutes);
app.use('/api', publicationRoutes);
app.use('/api', internshipRoutes);
app.use('/api', volunteerRoutes);
app.use('/api', donorRoutes);
app.use('/api', videoRoutes);
app.use('/api', clubRoutes);

// ---------------------------
// 404 HANDLER
// ---------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// ---------------------------
// ERROR HANDLER
// ---------------------------
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
});

// ---------------------------
// START SERVER AFTER DB CONNECT
// ---------------------------
const start = async () => {
  const connected = await connectDB();

  if (!connected) {
    console.warn(
      'Warning: MongoDB not connected. DB-backed routes will fail, but server is running.'
    );
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

start();

module.exports = app;
