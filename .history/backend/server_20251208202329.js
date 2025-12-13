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

const StorySchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  excerpt: String,
  image: String,
  author: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

const FaqSchema = new mongoose.Schema({
  question: String,
  answer: String,
  order: Number,
  createdAt: { type: Date, default: Date.now }
});

const AwardSchema = new mongoose.Schema({
  title: String,
  description: String,
  year: Number,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

const PublicationSchema = new mongoose.Schema({
  title: String,
  description: String,
  publishDate: Date,
  link: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

const CauseSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  image: String,
  order: Number,
  createdAt: { type: Date, default: Date.now }
});

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  status: { type: String, default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

const InternshipSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  college: String,
  course: String,
  message: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const CsrSchema = new mongoose.Schema({
  organizationName: String,
  contactPerson: String,
  contactEmail: String,
  contactPhone: String,
  organizationType: String,
  proposal: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const GlobalConfigSchema = new mongoose.Schema({
  siteName: String,
  contact: {
    email: String,
    phone: String,
    address: String
  },
  social: {
    facebook: String,
    twitter: String,
    instagram: String
  },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Page = mongoose.model('Page', PageSchema);
const Story = mongoose.model('Story', StorySchema);
const Event = mongoose.model('Event', EventSchema);
const Blog = mongoose.model('Blog', BlogSchema);
const Faq = mongoose.model('Faq', FaqSchema);
const Award = mongoose.model('Award', AwardSchema);
const Publication = mongoose.model('Publication', PublicationSchema);
const Cause = mongoose.model('Cause', CauseSchema);
const Contact = mongoose.model('Contact', ContactSchema);
const Internship = mongoose.model('Internship', InternshipSchema);
const Csr = mongoose.model('Csr', CsrSchema);
const GlobalConfig = mongoose.model('GlobalConfig', GlobalConfigSchema);

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

// Admin routes
app.get('/api/admin/pages', auth, async (req, res) => {
  try {
    const pages = await Page.find().sort({ createdAt: -1 });
    res.json(pages.map(p => p.slug));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/admin/pages/:slug', auth, async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) return res.status(404).json({ message: 'Page not found' });
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/admin/pages/:slug', auth, async (req, res) => {
  try {
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, upsert: true }
    );
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Stories
app.get('/api/admin/stories', auth, async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/admin/stories', auth, async (req, res) => {
  try {
    const story = new Story(req.body);
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/admin/stories/:id', auth, async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!story) return res.status(404).json({ message: 'Story not found' });
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/admin/stories/:id', auth, async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.json({ message: 'Story deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Events
app.get('/api/admin/events', auth, async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/admin/events', auth, async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/admin/events/:id', auth, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/admin/events/:id', auth, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Blogs
app.get('/api/admin/blogs', auth, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/admin/blogs', auth, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/admin/blogs/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/admin/blogs/:id', auth, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// FAQs
app.get('/api/admin/faqs', auth, async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ order: 1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/admin/faqs', auth, async (req, res) => {
  try {
    const faq = new Faq(req.body);
    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/admin/faqs/:id', auth, async (req, res) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faq) return res.status(404).json({ message: 'FAQ not found' });
    res.json(faq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/admin/faqs/:id', auth, async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ message: 'FAQ deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Awards
app.get('/api/admin/awards', auth, async (req, res) => {
  try {
    const awards = await Award.find().sort({ createdAt: -1 });
    res.json(awards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/admin/awards', auth, async (req, res) => {
  try {
    const award = new Award(req.body);
    await award.save();
    res.status(201).json(award);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/admin/awards/:id', auth, async (req, res) => {
  try {
    const award = await Award.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!award) return res.status(404).json({ message: 'Award not found' });
    res.json(award);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/admin/awards/:id', auth, async (req, res) => {
  try {
    await Award.findByIdAndDelete(req.params.id);
    res.json({ message: 'Award deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Publications
app.get('/api/admin/publications', auth, async (req, res) => {
  try {
    const publications = await Publication.find().sort({ createdAt: -1 });
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/admin/publications', auth, async (req, res) => {
  try {
    const publication = new Publication(req.body);
    await publication.save();
    res.status(201).json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/admin/publications/:id', auth, async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!publication) return res.status(404).json({ message: 'Publication not found' });
    res.json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/admin/publications/:id', auth, async (req, res) => {
  try {
    await Publication.findByIdAndDelete(req.params.id);
    res.json({ message: 'Publication deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Causes
app.get('/api/admin/causes', auth, async (req, res) => {
  try {
    const causes = await Cause.find().sort({ order: 1 });
    res.json(causes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/admin/causes', auth, async (req, res) => {
  try {
    const cause = new Cause(req.body);
    await cause.save();
    res.status(201).json(cause);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/admin/causes/:id', auth, async (req, res) => {
  try {
    const cause = await Cause.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cause) return res.status(404).json({ message: 'Cause not found' });
    res.json(cause);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/admin/causes/:id', auth, async (req, res) => {
  try {
    await Cause.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cause deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Contacts
app.get('/api/admin/contacts', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/admin/contacts/:id/status', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Internships
app.get('/api/admin/internships', auth, async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/admin/internships/:id/status', auth, async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!internship) return res.status(404).json({ message: 'Internship not found' });
    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CSR
app.get('/api/admin/csr', auth, async (req, res) => {
  try {
    const csrProposals = await Csr.find().sort({ createdAt: -1 });
    res.json(csrProposals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/admin/csr/:id/status', auth, async (req, res) => {
  try {
    const csr = await Csr.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!csr) return res.status(404).json({ message: 'CSR proposal not found' });
    res.json(csr);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Global Config
app.get('/api/admin/config', auth, async (req, res) => {
  try {
    let config = await GlobalConfig.findOne();
    if (!config) {
      config = new GlobalConfig({
        siteName: 'Sabri Helpage',
        contact: { email: 'info@sabrihelpage.org', phone: '', address: '' },
        social: { facebook: '', twitter: '', instagram: '' }
      });
      await config.save();
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/admin/config', auth, async (req, res) => {
  try {
    const config = await GlobalConfig.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
