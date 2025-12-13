const express = require('express');
const router = express.Router();

const { listCauses, createCause } = require('../controllers/causeController');
const { listStories, createStory } = require('../controllers/storyController');
const { createContact, listContacts } = require('../controllers/contactController');
const { createDonation, listDonations } = require('../controllers/donationController');
const { createSubscription, listSubscriptions } = require('../controllers/subscriptionController');

// Causes
router.get('/causes', listCauses);
router.post('/causes', createCause);

// Stories
router.get('/stories', listStories);
router.post('/stories', createStory);

// Contacts
router.post('/contact', createContact);
router.get('/contacts', listContacts);

// Donations
router.post('/donate', createDonation);
router.get('/donations', listDonations);

// Subscriptions
router.post('/subscribe', createSubscription);
router.get('/subscriptions', listSubscriptions);

module.exports = router;
