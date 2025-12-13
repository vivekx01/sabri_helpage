require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const teacherRoutes = require('./routes/teacherRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// ---------------------------
// PORT CONFIGURATION
// ---------------------------
const PORT = process.env.PORT || 5001;

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
app.use('/api', teacherRoutes);
app.use('/api', contactRoutes);

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
