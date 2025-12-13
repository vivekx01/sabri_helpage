// Minimal placeholder for /api/public route
const express = require('express');
const router = express.Router();

// Example: Health check
router.get('/', (req, res) => {
  res.json({ message: 'Public route is working.' });
});

module.exports = router;
