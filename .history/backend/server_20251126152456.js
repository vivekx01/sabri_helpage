require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const teacherRoutes = require('./routes/teacherRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'NGO Backend API is running',
  });
});

// Demo route: Animals
app.get('/api/animals', (req, res) => {
  res.json({
    success: true,
    data: ['dog', 'cat', 'lion'],
  });
});

// Mount teacher routes
app.use('/api', teacherRoutes);
// Mount contact routes
app.use('/api', contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

