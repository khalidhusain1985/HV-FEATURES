require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const storyRoutes = require('./routes/storyRoutes');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017").then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Use story routes
app.use('/api/stories', storyRoutes);

// Schedule task to delete stories after 24 hours
cron.schedule('0 * * * *', async () => {
  const now = new Date();
  await Story.deleteMany({ createdAt: { $lte: new Date(now - 24 * 60 * 60 * 1000) } });
  console.log('Deleted old stories');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
