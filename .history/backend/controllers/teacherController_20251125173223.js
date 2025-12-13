const Teacher = require('../models/Teacher');

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().lean();
    res.json({ data: teachers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.seedTeachers = async () => {
  try {
    const count = await Teacher.countDocuments();
    if (count === 0) {
      const sample = [
        { name: 'Aisha Khan' },
        { name: 'Rohan Mehta' },
        { name: 'Sana Patel' }
      ];
      await Teacher.insertMany(sample);
      console.log('Seeded teachers collection');
    } else {
      console.log('Teachers collection already has data');
    }
  } catch (err) {
    console.error('Error seeding teachers:', err);
  }
};
