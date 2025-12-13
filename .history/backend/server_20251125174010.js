// Basic Express server setup with MongoDB connection
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const apixyzRouter = require('./routes/apixyz');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Sabri Helpage backend is running');
});

app.use('/apixyz', apixyzRouter);

const MONGO_URI = process.env.DB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/sabrihelpage';

