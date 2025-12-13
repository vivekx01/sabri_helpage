require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
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

// CORS only (body parser comes after AdminJS)
app.use(cors());

// Simple role check
const isAdmin = ({ currentAdmin }) => {
  return currentAdmin && ['editor', 'manager', 'admin', 'super-admin'].includes(currentAdmin.role);
};

const isSuperAdmin = ({ currentAdmin }) => {
  return currentAdmin && currentAdmin.role === 'super-admin';
};

// Setup AdminJS - simple, flat structure
const adminJs = new AdminJS({
  resources: [
    { 
      resource: User, 
      options: { 
        properties: {
          password: { isVisible: { edit: true, show: false, list: false, filter: false } },
        },
      } 
    },
    { resource: Blog },
    { resource: Story },
    { resource: Event },
    { resource: Video },
    { resource: Award },
    { resource: Publication },
    { resource: FAQ },
    { resource: Teacher },
    { resource: Contact },
    { resource: Donor },
    { resource: Volunteer },
    { resource: Internship },
    { resource: ClubRegistration },
    { resource: SiteConfig },
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'NGO Admin Panel',
    logo: false,
    softwareBrothers: false,
  },
});

// Authentication for AdminJS
const bcrypt = require('bcryptjs');
const session = require('express-session');

const authenticate = async (email, password) => {
  // Must select password explicitly since it has select: false
  const user = await User.findOne({ email }).select('+password');
  if (!user) return null;
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  
  // Only allow admin roles to access admin panel
  if (!['editor', 'manager', 'admin', 'super-admin'].includes(user.role)) {
    return null;
  }
  
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    title: user.role.charAt(0).toUpperCase() + user.role.slice(1).replace('-', ' '),
  };
};

const signup = async (email, password, name) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    name,
    role: 'editor', // Default role for new signups
  });
  
  return {
    id: newUser._id.toString(),
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
    title: newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1),
  };
};

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: process.env.ADMINJS_COOKIE_SECRET || 'super-secret-cookie-password-change-in-production',
  },
  null,
  {
    resave: false,
    saveUninitialized: false,
    secret: process.env.ADMINJS_COOKIE_SECRET || 'super-secret-cookie-password-change-in-production',
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
    name: 'adminjs',
  }
);

app.use(adminJs.options.rootPath, adminRouter);

// Body parser middleware AFTER AdminJS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve custom login page
app.use(express.static(path.join(__dirname, 'public')));

// Add signup endpoint
app.post('/admin/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields required' });
    }
    
    const user = await signup(email, password, name);
    
    // Auto-login after signup
    req.session.adminUser = user;
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: 'Session error' });
      }
      res.json({ 
        success: true, 
        message: 'Account created successfully',
        redirectUrl: '/admin'
      });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Health Check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'NGO Backend API is running',
    version: '1.0.0',
    adminPanel: '/admin',
  });
});

// Stats endpoint for dashboard
app.get('/api/stats', async (req, res) => {
  try {
    const stats = {
      users: await User.countDocuments(),
      blogs: await Blog.countDocuments(),
      stories: await Story.countDocuments(),
      events: await Event.countDocuments(),
      videos: await Video.countDocuments(),
      contacts: await Contact.countDocuments(),
      volunteers: await Volunteer.countDocuments(),
      donors: await Donor.countDocuments(),
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
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
