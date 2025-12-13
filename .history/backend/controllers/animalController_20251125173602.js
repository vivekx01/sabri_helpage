const Animal = require('../models/Animal');

exports.getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find().lean();
    res.json({ data: animals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.seedAnimals = async () => {
  try {
    const count = await Animal.countDocuments();
    if (count === 0) {
      const sample = [
        { name: 'Milo', species: 'Dog' },
        { name: 'Zara', species: 'Cat' },
        { name: 'Kiki', species: 'Parrot' }
      ];
      await Animal.insertMany(sample);
      console.log('Seeded animals collection');
    } else {
      console.log('Animals collection already has data');
    }
  } catch (err) {
    console.error('Error seeding animals:', err);
  }
};
