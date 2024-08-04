const express = require('express');
const { enrollCourse, cancelEnrollment, getMyCourses } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/enroll', auth, enrollCourse);
router.post('/cancel-enrollment', auth, cancelEnrollment);
router.get('/my-courses', auth, getMyCourses);

module.exports = router;
