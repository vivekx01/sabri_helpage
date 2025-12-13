const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    // Ensure default homepage and sample page exist
    const Page = require('./models/Page');
    const pages = await Page.find();
    if (pages.length === 0) {
      await Page.create({
        slug: 'home',
        title: 'Homepage',
        subtitle: 'Welcome to Sabri Helpage',
        sections: [{ type: 'hero', heading: 'Welcome!', content: 'This is your homepage.' }],
        status: 'published'
      });
      await Page.create({
        slug: 'about',
        title: 'About Us',
        subtitle: 'Learn more about us',
        sections: [{ type: 'text', heading: 'About', content: 'This is the about page.' }],
        status: 'published'
      });
      console.log('✅ Default homepage and about page created');
    }
  })
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/public', require('./routes/public'));

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
