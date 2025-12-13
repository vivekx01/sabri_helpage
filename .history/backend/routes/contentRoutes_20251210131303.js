import express from 'express';
import {
  getPageContent,
  updatePageContent,
  getAllPages
} from '../controllers/contentController.js';

const router = express.Router();

// Get content for a specific page by slug
router.get('/content/page/:slug', getPageContent);

// Update content for a specific page by slug
router.put('/content/page/:slug', updatePageContent);

// Get all pages
router.get('/content/pages', getAllPages);

export default router;
