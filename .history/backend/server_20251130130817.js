require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


// ---------------------------
// APP INIT
// ---------------------------
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// No AdminJS in this build (removed for compatibility)

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
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/teacherRoutes'));
app.use('/api', require('./routes/contactRoutes'));
app.use('/api', require('./routes/blogRoutes'));
app.use('/api', require('./routes/storyRoutes'));
app.use('/api', require('./routes/eventRoutes'));
app.use('/api', require('./routes/awardRoutes'));
app.use('/api', require('./routes/faqRoutes'));
app.use('/api', require('./routes/publicationRoutes'));
app.use('/api', require('./routes/internshipRoutes'));
app.use('/api', require('./routes/volunteerRoutes'));
app.use('/api', require('./routes/donorRoutes'));
app.use('/api', require('./routes/videoRoutes'));
app.use('/api', require('./routes/clubRoutes'));

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
const PORT = process.env.PORT || 5000;

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
