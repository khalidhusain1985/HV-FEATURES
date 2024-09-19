const express = require('express');
const Story = require('../models/Story');
const multer = require('multer');
const router = express.Router();

// Multer setup to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new story
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { userId } = req.body;
    const fileUrl = req.file.buffer.toString('base64'); // Base64 encode the file for simplicity

    const story = new Story({ userId, fileUrl });
    await story.save();

    res.status(201).json({ message: 'Story uploaded', story });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading story', error });
  }
});

// Fetch all stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stories', error });
  }
});

module.exports = router;
