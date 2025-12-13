require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');

// Register AdminJS adapter
AdminJS.registerAdapter(AdminJSMongoose);

// Initialize Express
const app = express();

// Import models
const User = require('./models/User');
const Blog = require('./models/Blog');
const Story = require('./models/Story');
const Event = require('./models/Event');
const Video = require('./models/Video');
const Award = require('./models/Award');
const Publication = require('./models/Publication');
const FAQ = require('./models/Faq');
const Teacher = require('./models/Teacher');
const Contact = require('./models/Contact');
const Donor = require('./models/Donor');
const Volunteer = require('./models/Volunteer');
const Internship = require('./models/Internship');
const ClubRegistration = require('./models/ClubRegistration');
const SiteConfig = require('./models/SiteConfig');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup AdminJS
const adminJs = new AdminJS({
  resources: [
    { resource: User, options: { navigation: { name: 'User Management' } } },
    { resource: Blog, options: { navigation: { name: 'Content' } } },
    { resource: Story, options: { navigation: { name: 'Content' } } },
    { resource: Event, options: { navigation: { name: 'Content' } } },
    { resource: Video, options: { navigation: { name: 'Media' } } },
    { resource: Award, options: { navigation: { name: 'Achievements' } } },
    { resource: Publication, options: { navigation: { name: 'Achievements' } } },
    { resource: FAQ, options: { navigation: { name: 'Support' } } },
    { resource: Teacher, options: { navigation: { name: 'People' } } },
    { resource: Contact, options: { navigation: { name: 'Communications' } } },
    { resource: Donor, options: { navigation: { name: 'Fundraising' } } },
    { resource: Volunteer, options: { navigation: { name: 'Volunteers' } } },
    { resource: Internship, options: { navigation: { name: 'Opportunities' } } },
    { resource: ClubRegistration, options: { navigation: { name: 'Community' } } },
    { resource: SiteConfig, options: { navigation: { name: 'Settings' } } },
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'NGO Admin Panel',
    softwareBrothers: false,
  },
});

const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// Health Check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'NGO Backend API is running',
    version: '1.0.0',
    adminPanel: '/admin',
  });
});

// API Info Route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'NGO Backend API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/user',
      blogs: '/api/blogs',
      events: '/api/events',
      stories: '/api/stories',
      teachers: '/api/teachers',
      contacts: '/api/contacts',
      awards: '/api/awards',
      faqs: '/api/faqs',
      publications: '/api/publications',
      videos: '/api/videos',
      donors: '/api/donors',
      volunteers: '/api/volunteers',
      internships: '/api/internships',
      clubs: '/api/clubs',
      config: '/api/config',
      upload: '/api/upload',
    },
    adminPanel: '/admin',
  });
});

// API Routes
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
app.use('/api', require('./routes/configRoutes'));
app.use('/api', require('./routes/uploadRoutes'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    // Connect to database
    const connected = await connectDB();
    
    if (!connected) {
      console.warn('⚠️  MongoDB not connected. Server will run but database features won\'t work.');
    }

    // Start server
    app.listen(PORT, () => {
      console.log('\n' + '='.repeat(50));
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 API: http://localhost:${PORT}/api`);
      console.log('='.repeat(50) + '\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

start();

module.exports = app;
