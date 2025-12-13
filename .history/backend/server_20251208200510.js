const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cms-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Models
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: 'admin' }
});

const PageSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  title: String,
  sections: [{
    id: String,
    type: String,
    title: String,
    content: mongoose.Schema.Types.Mixed,
    order: Number
  }],
  status: { type: String, default: 'published' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Page = mongoose.model('Page', PageSchema);

// Auth middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Routes
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret');
  res.json({ token, user: { username: user.username, role: user.role } });
});

// Page routes
app.get('/api/pages', auth, async (req, res) => {
  const pages = await Page.find().sort({ createdAt: -1 });
  res.json(pages);
});

app.get('/api/pages/:slug', async (req, res) => {
  const page = await Page.findOne({ slug: req.params.slug });
  if (!page) return res.status(404).json({ message: 'Page not found' });
  res.json(page);
});

app.post('/api/pages', auth, async (req, res) => {
  const page = new Page(req.body);
  await page.save();
  res.status(201).json(page);
});

app.put('/api/pages/:slug', auth, async (req, res) => {
  const page = await Page.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
  if (!page) return res.status(404).json({ message: 'Page not found' });
  res.json(page);
});

app.delete('/api/pages/:slug', auth, async (req, res) => {
  await Page.findOneAndDelete({ slug: req.params.slug });
  res.json({ message: 'Page deleted' });
});

// Initialize default admin user
const initAdmin = async () => {
  const adminExists = await User.findOne({ username: 'admin' });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({ username: 'admin', password: hashedPassword });
    console.log('Default admin user created: admin/admin123');
  }
};

initAdmin();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
