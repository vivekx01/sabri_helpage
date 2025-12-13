const Story = require('../models/Story');

exports.listStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 }).lean();
    res.json({ data: stories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createStory = async (req, res) => {
  try {
    const { title, excerpt, content, image, author } = req.body;
    const story = new Story({ title, excerpt, content, image, author });
    await story.save();
    res.status(201).json({ data: story });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save story' });
  }
};
