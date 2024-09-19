const express = require('express');
const { uploadStory, removeExpiredStories } = require('../controllers/storyController');

const router = express.Router();

// Route to upload a story
router.post('/upload', uploadStory);

// Route to clean up expired stories
router.post('/cleanup', removeExpiredStories);

module.exports = router;
