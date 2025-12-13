const express = require('express');
const router = express.Router();
const { getTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher } = require('../controllers/teacherController');
const { protect } = require('../middleware/authMiddleware');
const { permit } = require('../middleware/roleMiddleware');

router.get('/teachers', getTeachers);
router.get('/teachers/:id', getTeacherById);
router.post('/teachers', protect, permit('editor', 'manager', 'admin', 'super-admin'), createTeacher);
router.put('/teachers/:id', protect, permit('editor', 'manager', 'admin', 'super-admin'), updateTeacher);
router.delete('/teachers/:id', protect, permit('manager', 'admin', 'super-admin'), deleteTeacher);

module.exports = router;
