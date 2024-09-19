const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '24h' }, // Auto delete after 24h
});

module.exports = mongoose.model('Story', storySchema);
