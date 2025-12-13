require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// AdminJS
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const bcrypt = require('bcryptjs');

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register AdminJS adapter
AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

// Setup AdminJS
const setupAdminJS = async () => {
  try {
    // Import models
    const User = require('./models/User');
    const Blog = require('./models/Blog');
    const Event = require('./models/Event');
    const Contact = require('./models/Contact');
    const Story = require('./models/Story');
    const Award = require('./models/Award');
    const FAQ = require('./models/Faq');
    const Publication = require('./models/Publication');
    const Internship = require('./models/Internship');
    const Volunteer = require('./models/Volunteer');
    const Donor = require('./models/Donor');
    const Video = require('./models/Video');
    const ClubRegistration = require('./models/ClubRegistration');
    const SiteConfig = require('./models/SiteConfig');
    const Teacher = require('./models/Teacher');

    const adminJs = new AdminJS({
      resources: [
        {
          resource: User,
          options: {
            properties: {
              password: {
                isVisible: { list: false, filter: false, show: false, edit: true },
                type: 'password',
              },
            },
            actions: {
              new: {
                before: async (request) => {
                  if (request.payload?.password) {
                    request.payload.password = await bcrypt.hash(request.payload.password, 10);
                  }
                  return request;
                },
              },
              edit: {
                before: async (request) => {
                  if (request.payload?.password) {
                    request.payload.password = await bcrypt.hash(request.payload.password, 10);
                  } else {
                    delete request.payload.password;
                  }
                  return request;
                },
              },
            },
          },
        },
        Blog,
        Event,
        Contact,
        Story,
        Award,
        FAQ,
        Publication,
        Internship,
        Volunteer,
        Donor,
        Video,
        ClubRegistration,
        SiteConfig,
        Teacher,
      ],
      rootPath: '/admin',
      branding: {
        companyName: 'Sabri Helpage Admin',
        logo: false,
        softwareBrothers: false,
      },
    });

    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
      adminJs,
      {
        authenticate: async (email, password) => {
          const User = require('./models/User');
          const user = await User.findOne({ email }).select('+password');
          if (user && (await user.matchPassword(password))) {
            if (['super-admin', 'admin'].includes(user.role)) {
              return user;
            }
          }
          return null;
        },
        cookieName: 'adminjs',
        cookiePassword: process.env.ADMINJS_COOKIE_SECRET || 'adminjs-secret',
      },
      null,
      {
        resave: false,
        saveUninitialized: true,
        secret: process.env.ADMINJS_COOKIE_SECRET || 'adminjs-secret',
        cookie: {
          httpOnly: process.env.NODE_ENV === 'production',
          secure: process.env.NODE_ENV === 'production',
        },
      }
    );

    app.use(adminJs.options.rootPath, adminRouter);
    console.log(`📊 Admin panel: http://localhost:${process.env.PORT || 5000}/admin`);
  } catch (error) {
    console.error('AdminJS setup error:', error.message);
  }
};

// Health Check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'NGO Backend API is running',
    adminPanel: '/admin',
    version: '1.0.0',
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
    
    // Setup AdminJS if database is connected
    if (connected) {
      await setupAdminJS();
    } else {
      console.warn('⚠️  MongoDB not connected. Server will run but database features won\'t work.');
    }

    // Start server
    app.listen(PORT, () => {
      console.log('\n' + '='.repeat(50));
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 API: http://localhost:${PORT}`);
      if (connected) {
        console.log(`📊 Admin: http://localhost:${PORT}/admin`);
      }
      console.log('='.repeat(50) + '\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

start();

module.exports = app;
