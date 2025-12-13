const express = require('express');
const router = express.Router();
const { getAwards, getAwardById, createAward, updateAward, deleteAward } = require('../controllers/awardController');

router.get('/awards', getAwards);
router.get('/awards/:id', getAwardById);
router.post('/awards', createAward);
router.put('/awards/:id', updateAward);
router.delete('/awards/:id', deleteAward);

module.exports = router;
