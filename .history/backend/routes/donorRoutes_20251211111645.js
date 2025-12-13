const express = require('express');
const router = express.Router();
const { getDonors, getDonorById, createDonor, updateDonor, deleteDonor } = require('../controllers/donorController');

router.get('/donors', getDonors);
router.get('/donors/:id', getDonorById);
router.post('/donors', createDonor);
router.put('/donors/:id', updateDonor);
router.delete('/donors/:id', deleteDonor);

module.exports = router;
