const asyncHandler = require('express-async-handler');
const SiteConfig = require('../models/SiteConfig');

const getConfig = asyncHandler(async (req, res) => {
  let config = await SiteConfig.findOne({});
  if (!config) {
    // Initialize with sane defaults mirroring current frontend assets
    config = await SiteConfig.create({
      logoUrl: '/websiteLogo.jpg',
      heroImages: ['/HeroSection.jpg'],
      carouselImages: ['/event2.jpg', '/event3.jpg', '/event4.jpg'],
      galleryImages: ['/event1.jpg','/event2.jpg','/event3.jpg','/event4.jpg','/event5.jpg','/event6.jpg','/event7.jpg'],
      primaryVideoId: 'csNcS9X49dQ',
      imageMap: {
        HERO: '/HeroSection.jpg',
        MENTAL_HEALTH: '/MentalHealth.jpg',
        ELDERLY_CARE: '/elderlyCareImg.jpg',
        GIRL_EDUCATION: '/girlChildEducation.jpg',
        WHAT_WE_STAND_FOR_1: '/event2.jpg',
        WHAT_WE_STAND_FOR_2: '/event3.jpg',
        WHAT_WE_STAND_FOR_3: '/event4.jpg',
        VIDEO_THUMBNAIL: '/event2.jpg',
        NEWS_3_WATER: '/WaterFilteration.jpg',
      },
      socialLinks: [
        { label: 'Youtube', url: 'https://www.youtube.com/@sabrihelpage' },
        { label: 'Instagram', url: 'https://www.instagram.com/sabrihelpage/' },
        { label: 'Linkedin', url: 'https://www.linkedin.com/company/sabri-helpage/' },
        { label: 'Facebook', url: 'https://www.facebook.com/SabriHelpage/' },
        { label: 'X', url: 'https://x.com/SabriHelpage' },
      ],
    });
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