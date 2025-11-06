// backend/server.js


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Mongoose Connection ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors()); // Enables cross-origin requests from the React frontend
app.use(express.json()); // Allows parsing of JSON request bodies

// Simple test route
app.get('/', (req, res) => {
    res.send('Vibe E-Com Backend Running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));