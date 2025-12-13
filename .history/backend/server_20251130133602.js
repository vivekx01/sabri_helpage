require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// AdminJS imports
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Register AdminJS adapters
AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

// ---------------------------
// APP INIT
// ---------------------------
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------
// ADMINJS SETUP
// ---------------------------
const setupAdminJS = async () => {
  // Import all models
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
                  request.payload.password = await bcrypt.hash(
                    request.payload.password,
                    10
                  );
                }
                return request;
              },
            },
            edit: {
              before: async (request) => {
                if (request.payload?.password) {
                  request.payload.password = await bcrypt.hash(
                    request.payload.password,
                    10
                  );
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

  // Authentication for AdminJS
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
      authenticate: async (email, password) => {
        const user = await User.findOne({ email }).select('+password');
        if (user && (await user.matchPassword(password))) {
          // Only allow super-admin and admin roles
          if (['super-admin', 'admin'].includes(user.role)) {
            return user;
          }
        }
        return null;
      },
      cookieName: 'adminjs',
      cookiePassword: process.env.ADMINJS_COOKIE_SECRET || 'change-this-secret-in-production',
    },
    null,
    {
      resave: false,
      saveUninitialized: true,
      secret: process.env.ADMINJS_COOKIE_SECRET || 'change-this-secret-in-production',
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
    }
  );

  app.use(adminJs.options.rootPath, adminRouter);
  console.log(`📊 AdminJS panel available at http://localhost:${process.env.PORT || 5000}${adminJs.options.rootPath}`);
};

// ---------------------------
// HEALTH CHECK
// ---------------------------
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'NGO Backend API is running',
    adminPanel: '/admin',
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
app.use('/api', require('./routes/configRoutes'));
app.use('/api', require('./routes/uploadRoutes'));

// ---------------------------
// 404 HANDLER (must be after all routes)
// ---------------------------
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
  });
});

// ---------------------------
// ERROR HANDLER (must be last)
// ---------------------------
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
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
  } else {
    // Setup AdminJS only if DB is connected
    await setupAdminJS();
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    if (connected) {
      console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
    }
  });
};

start();

module.exports = app;
