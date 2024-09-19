const Story = require('../models/stories');

// Function to upload a story
const uploadStory = async (req, res) => {
  const { userId, mediaUrl, mediaType } = req.body;

  try {
    const newStory = new Story({
      user_id: userId,
      media_url: mediaUrl,
      media_type: mediaType,
      posted_at: new Date(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
      views: [],
      is_active: true
    });

    const savedStory = await newStory.save();
    res.json({ message: 'Story uploaded successfully', story: savedStory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to remove expired stories
const removeExpiredStories = async (req, res) => {
  try {
    const result = await Story.updateMany(
      { expires_at: { $lt: new Date() }, is_active: true },
      { $set: { is_active: false } }
    );
    res.json({ message: 'Expired stories updated', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadStory, removeExpiredStories };
