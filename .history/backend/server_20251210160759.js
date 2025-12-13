require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const connectDB = require('./config/db');

// Import generic Page model
const Page = require('./models/Page');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Register AdminJS adapter
AdminJS.registerAdapter(AdminJSMongoose);

// Configure AdminJS for generic Page model
const adminJs = new AdminJS({
  resources: [
    {
      resource: Page,
      options: {
        properties: {
          sections: { type: 'mixed' },
          stats: { type: 'mixed' }
        }
      }
    }
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'Sabri Helpage Admin',
    logo: false,
  },
});

// Build and use admin router
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);

// API routes

const pageRoutes = require('./routes/pageRoutes');
app.use('/api/pages', pageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`AdminJS available at http://localhost:${PORT}/admin`);
});
