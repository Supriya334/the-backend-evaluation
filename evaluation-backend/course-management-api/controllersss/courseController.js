const Course = require('../models/Course');

exports.getCourses = async (req, res) => {
  const { page = 1, limit = 10, category, difficulty } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (difficulty) filter.difficulty = difficulty;

  try {
    const courses = await Course.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Course.countDocuments(filter);
    res.json({ courses, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
