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

// Role-based access control helpers
const canModifyUsers = ({ currentAdmin }) => {
  return currentAdmin && ['admin', 'super-admin'].includes(currentAdmin.role);
};

const canDelete = ({ currentAdmin }) => {
  return currentAdmin && ['manager', 'admin', 'super-admin'].includes(currentAdmin.role);
};

const canEdit = ({ currentAdmin }) => {
  return currentAdmin && ['editor', 'manager', 'admin', 'super-admin'].includes(currentAdmin.role);
};

const canViewSensitive = ({ currentAdmin }) => {
  return currentAdmin && ['manager', 'admin', 'super-admin'].includes(currentAdmin.role);
};

// Custom Dashboard Component
const Dashboard = {
  component: AdminJS.bundle('./components/Dashboard'),
  handler: async (request, response, context) => {
    const { currentAdmin } = context;
    
    // Get statistics
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
    
    return {
      stats,
      currentAdmin,
    };
  },
};

// Setup AdminJS with enhanced configuration
const adminJs = new AdminJS({
  resources: [
    { 
      resource: User, 
      options: { 
        navigation: { name: 'User Management', icon: 'User' },
        properties: {
          password: { isVisible: { edit: true, show: false, list: false, filter: false } },
        },
        actions: {
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'super-admin' },
          new: { isAccessible: canModifyUsers },
        }
      } 
    },
    { 
      resource: Blog, 
      options: { 
        navigation: { name: 'Content', icon: 'Article' },
        actions: {
          edit: { isAccessible: canEdit },
          delete: { isAccessible: canDelete },
          new: { isAccessible: canEdit },
        }
      } 
    },
    { 
      resource: Story, 
      options: { 
        navigation: { name: 'Content', icon: 'BookOpen' },
        actions: {
          edit: { isAccessible: canEdit },
          delete: { isAccessible: canDelete },
          new: { isAccessible: canEdit },
        }
      } 
    },
    { 
      resource: Event, 
      options: { 
        navigation: { name: 'Content', icon: 'Calendar' },
        actions: {
          edit: { isAccessible: canEdit },
          delete: { isAccessible: canDelete },
          new: { isAccessible: canEdit },
        }
      } 
    },
    { 
      resource: Video, 
      options: { 
        navigation: { name: 'Media', icon: 'Video' },
        actions: {
          edit: { isAccessible: canEdit },
          delete: { isAccessible: canDelete },
          new: { isAccessible: canEdit },
        }
      } 
    },
    { 
      resource: Award, 
      options: { 
        navigation: { name: 'Achievements', icon: 'Award' },
        actions: {
          edit: { isAccessible: canEdit },
          delete: { isAccessible: canDelete },
          new: { isAccessible: canEdit },
        }
      } 
    },
    { 
      resource: Publication, 
      options: { 
        navigation: { name: 'Achievements', icon: 'Book' },
        actions: {
          edit: { isAccessible: canEdit },
          delete: { isAccessible: canDelete },
          new: { isAccessible: canEdit },
        }
      } 
    },
    { 
      resource: FAQ, 
      options: { 
        navigation: { name: 'Support', icon: 'Help' },
        actions: {
          edit: { isAccessible: canEdit },
          delete: { isAccessible: canDelete },
          new: { isAccessible: canEdit },
        }
      } 
    },
    { 
      resource: Teacher, 
      options: { 
        navigation: { name: 'People', icon: 'Users' },
        actions: {
          edit: { isAccessible: canEdit },
          delete: { isAccessible: canDelete },
          new: { isAccessible: canEdit },
        }
      } 
    },
    { 
      resource: Contact, 
      options: { 
        navigation: { name: 'Communications', icon: 'Mail' },
        actions: {
          list: { isAccessible: canViewSensitive },
          show: { isAccessible: canViewSensitive },
          edit: { isAccessible: canViewSensitive },
          delete: { isAccessible: canDelete },
        }
      } 
    },
    { 
      resource: Donor, 
      options: { 
        navigation: { name: 'Fundraising', icon: 'DollarSign' },
        actions: {
          list: { isAccessible: canViewSensitive },
          show: { isAccessible: canViewSensitive },
          edit: { isAccessible: canViewSensitive },
          delete: { isAccessible: canDelete },
          new: { isAccessible: canViewSensitive },
        }
      } 
    },
    { 
      resource: Volunteer, 
      options: { 
        navigation: { name: 'Volunteers', icon: 'Heart' },
        actions: {
          list: { isAccessible: canViewSensitive },
          show: { isAccessible: canViewSensitive },
          edit: { isAccessible: canViewSensitive },
          delete: { isAccessible: canDelete },
        }
      } 
    },
    { 
      resource: Internship, 
      options: { 
        navigation: { name: 'Opportunities', icon: 'Briefcase' },
        actions: {
          list: { isAccessible: canViewSensitive },
          show: { isAccessible: canViewSensitive },
          edit: { isAccessible: canViewSensitive },
          delete: { isAccessible: canDelete },
        }
      } 
    },
    { 
      resource: ClubRegistration, 
      options: { 
        navigation: { name: 'Community', icon: 'Users' },
        actions: {
          list: { isAccessible: canViewSensitive },
          show: { isAccessible: canViewSensitive },
          edit: { isAccessible: canViewSensitive },
          delete: { isAccessible: canDelete },
        }
      } 
    },
    { 
      resource: SiteConfig, 
      options: { 
        navigation: { name: 'Settings', icon: 'Settings' },
        actions: {
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'super-admin' },
          new: { isAccessible: canModifyUsers },
        }
      } 
    },
  ],
  dashboard: {
    component: AdminJS.bundle('./components/dashboard'),
  },
  rootPath: '/admin',
  branding: {
    companyName: 'NGO Management System',
    logo: false,
    theme: {
      colors: {
        primary100: '#4285f4',
        primary80: '#5a95f5',
        primary60: '#73a5f6',
        primary40: '#8cb6f7',
        primary20: '#a6c6f9',
        accent: '#38c172',
        love: '#e74c3c',
        grey100: '#1a1a1a',
        grey80: '#4d4d4d',
        grey60: '#808080',
        grey40: '#b3b3b3',
        grey20: '#e6e6e6',
        white: '#ffffff',
        error: '#e74c3c',
        success: '#38c172',
        warning: '#f39c12',
      },
    },
    softwareBrothers: false,
  },
  locale: {
    language: 'en',
    translations: {
      en: {
        resources: {
          User: { name: 'Users' },
          Blog: { name: 'Blogs' },
          Story: { name: 'Stories' },
          Event: { name: 'Events' },
          Video: { name: 'Videos' },
          Award: { name: 'Awards' },
          Publication: { name: 'Publications' },
          FAQ: { name: 'FAQs' },
          Teacher: { name: 'Teachers' },
          Contact: { name: 'Contact Messages' },
          Donor: { name: 'Donors' },
          Volunteer: { name: 'Volunteer Applications' },
          Internship: { name: 'Internship Applications' },
          ClubRegistration: { name: 'Club Registrations' },
          SiteConfig: { name: 'Site Configuration' },
        },
      },
    },
  },
});

// Authentication for AdminJS
const bcrypt = require('bcryptjs');
const session = require('express-session');

const authenticate = async (email, password) => {
  const user = await User.findOne({ email });
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
