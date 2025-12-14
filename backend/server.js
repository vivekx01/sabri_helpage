const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './backend/.env' });

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:3000'
  ],
  credentials: true, // Allow credentials (cookies, authorization headers)
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));

app.use('/api/public', require('./routes/public'));

// Public config endpoint
app.get('/config', (req, res) => {
  // You can customize what config you want to expose here
  res.json({
    apiBaseUrl: process.env.API_BASE_URL || '',
    env: process.env.NODE_ENV || 'development',
    // Add more public config as needed
  });
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Sabri Helpage API is running!' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
