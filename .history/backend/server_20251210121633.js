require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const connectDB = require('./config/db');

// Import only Page model for AdminJS
const Page = require('./models/Page');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true,
}));
app.use(express.json());
app.use(express.static('public'));

// Register AdminJS adapter
AdminJS.registerAdapter(AdminJSMongoose);

// Configure AdminJS for Page model only
const adminJs = new AdminJS({
  resources: [Page],
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
const contentRoutes = require('./routes/contentRoutes');
app.use('/api', contentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`AdminJS available at http://localhost:${PORT}/admin`);
});
