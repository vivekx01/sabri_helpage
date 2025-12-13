const Cause = require('../models/Cause');

exports.listCauses = async (req, res) => {
  try {
    const causes = await Cause.find().sort({ priority: -1 }).lean();
    res.json({ data: causes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createCause = async (req, res) => {
  try {
    const { slug, title, description, image, priority } = req.body;
    const cause = new Cause({ slug, title, description, image, priority });
    await cause.save();
    res.status(201).json({ data: cause });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save cause' });
  }
};
