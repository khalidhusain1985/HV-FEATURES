const express = require('express');
const connectDB = require('./config/db');
const storyRoutes = require('./routes/storyRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes for stories
app.use('/stories', storyRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
