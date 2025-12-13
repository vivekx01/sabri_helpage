const express = require('express');
const router = express.Router();
const { getAnimals } = require('../controllers/animalController');
const { getTeachers } = require('../controllers/teacherController');

// GET /apixyz/animals -> list animals
router.get('/animals', getAnimals);

// GET /apixyz/teachers -> list teachers
router.get('/teachers', getTeachers);

module.exports = router;
