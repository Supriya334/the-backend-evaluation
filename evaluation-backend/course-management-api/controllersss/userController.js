const User = require('../models/User');
const Course = require('../models/Course');

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.enrolledCourses.push(req.body.courseId);
    await user.save();
    res.json({ message: 'Course enrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.cancelEnrollment = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.enrolledCourses.pull(req.body.courseId);
    await user.save();
    res.json({ message: 'Enrollment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('enrolledCourses');
    res.json({ courses: user.enrolledCourses });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
