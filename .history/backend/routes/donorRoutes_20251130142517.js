const express = require('express');
const router = express.Router();
const { getDonors, getDonorById, createDonor, updateDonor, deleteDonor } = require('../controllers/donorController');
const { protect } = require('../middleware/authMiddleware');

router.get('/donors', protect, getDonors);
router.get('/donors/:id', protect, getDonorById);
router.post('/donors', createDonor); // Public submission
router.put('/donors/:id', protect, updateDonor);
router.delete('/donors/:id', protect, deleteDonor);

module.exports = router;
