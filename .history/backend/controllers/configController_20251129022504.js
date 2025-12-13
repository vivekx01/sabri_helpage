const asyncHandler = require('express-async-handler');
const SiteConfig = require('../models/SiteConfig');

const getConfig = asyncHandler(async (req, res) => {
  let config = await SiteConfig.findOne({});
  if (!config) {
    config = await SiteConfig.create({});
  }
  res.json({ success: true, data: config });
});

const updateConfig = asyncHandler(async (req, res) => {
  let config = await SiteConfig.findOne({});
  
  if (!config) {
    config = await SiteConfig.create(req.body);
  } else {
    config = await SiteConfig.findByIdAndUpdate(config._id, req.body, {
      new: true,
      runValidators: true
    });
  }
  
  res.json({ success: true, data: config });
});

module.exports = { getConfig, updateConfig };