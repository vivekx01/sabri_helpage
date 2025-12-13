// Example routes file
const express = require('express');
const router = express.Router();

// Example route
router.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router;
