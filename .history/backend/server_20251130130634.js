require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// ---------------------------
// ADMINJS SETUP
// ---------------------------
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
AdminJS.registerAdapter(AdminJSMongoose);

// LOAD ALL MODELS
const Teacher = require('./models/Teacher');
const Contact = require('./models/Contact');
const Blog = require('./models/Blog');
const Story = require('./models/Story');
const Event = require('./models/Event');
const Award = require('./models/Award');
const FAQ = require('./models/FAQ');
const Publication = require('./models/Publication');
const Internship = require('./models/Internship');
const Volunteer = require('./models/Volunteer');
const Donor = require('./models/Donor');
const Video = require('./models/Video');
const Club = require('./models/Club');
const User = require('./models/User');

// Create AdminJS instance
const adminJs = new AdminJS({
  rootPath: '/admin',
  resources: [
    Teacher,
    Contact,
    Blog,
    Story,
    Event,
    Award,
    FAQ,
    Publication,
    Internship,
    Volunteer,
    Donor,
    Video,
    Club,
    User,
  ],
  branding: {
    companyName: 'Sabri Helpage Admin',
    logo: false,
  }
});

// Auth for admin panel
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASS = process.env.ADMIN_PASS || 'password';

// Create admin router
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      return true;
    }
    return null;
  },
  cookieName: 'adminjs',
  cookiePassword: process.env.COOKIE_SECRET || 'super-secret',
});

// ---------------------------
// APP INIT
// ---------------------------
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ADMIN PAGE ROUTE
app.use(adminJs.options.rootPath, adminRouter);

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
    console.log(`🛠 Admin Panel: http://localhost:${PORT}/admin`);
  });
};

start();

module.exports = app;
