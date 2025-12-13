const express = require('express');
const router = express.Router();
const { getAwards, getAwardById, createAward, updateAward, deleteAward } = require('../controllers/awardController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

router.get('/awards', getAwards);
router.get('/awards/:id', getAwardById);
router.post('/awards', protect, permit('editor', 'manager', 'admin', 'super-admin'), createAward);
router.put('/awards/:id', protect, permit('editor', 'manager', 'admin', 'super-admin'), updateAward);
router.delete('/awards/:id', protect, permit('manager', 'admin', 'super-admin'), deleteAward);

module.exports = router;
