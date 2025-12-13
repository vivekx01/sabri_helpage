const express = require('express');
const router = express.Router();

const {
  getTeachers,
  createTeacher,
  getTeacherById,
} = require('../controllers/teacherController');

// GET all teachers
router.get('/teachers', getTeachers);

// POST create a new teacher
router.post('/teachers', createTeacher);

// GET a single teacher by ID
router.get('/teachers/:id', getTeacherById);

module.exports = router;
