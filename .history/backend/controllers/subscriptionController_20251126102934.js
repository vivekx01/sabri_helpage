const Subscription = require('../models/Subscription');

exports.createSubscription = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    const existing = await Subscription.findOne({ email });
    if (existing) return res.status(200).json({ data: existing, message: 'Already subscribed' });
    const sub = new Subscription({ email, name });
    await sub.save();
    res.status(201).json({ data: sub });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save subscription' });
  }
};

exports.listSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find().sort({ createdAt: -1 }).lean();
    res.json({ data: subs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
