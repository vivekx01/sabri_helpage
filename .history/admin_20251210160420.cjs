const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// Register the Mongoose adapter
AdminJS.registerAdapter(AdminJSMongoose)

// Import your Page model
const Page = require('./backend/models/Page')

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sabrihelpage')

// Setup AdminJS
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
    // You can add more models here
  ],
  rootPath: '/admin',
})

const router = AdminJSExpress.buildRouter(adminJs)

const app = express()
app.use(adminJs.options.rootPath, router)

const PORT = process.env.ADMIN_PORT || 5050
app.listen(PORT, () => {
  console.log(`AdminJS running at http://localhost:${PORT}${adminJs.options.rootPath}`)
})
