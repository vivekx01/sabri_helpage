const express = require('express');
const router = express.Router();
const { getConfig, updateConfig } = require('../controllers/configController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

router.get('/config', getConfig);
router.put('/config', protect, permit('admin', 'super-admin'), updateConfig);

module.exports = router;
