// backend/server.js


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product'); // Import the model
const mockProducts = require('./data/mockProducts');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Mongoose Connection ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Data Seeding Function (for first run only) ---
const seedProducts = async () => {
    try {
        // Count existing products
        const count = await Product.countDocuments();
        if (count === 0) {
            await Product.insertMany(mockProducts, { ordered: false });
            console.log('Product data successfully seeded!');
        } else {
            console.log(`Database already contains ${count} products.`);
        }
    } catch (error) {
        console.error('Error seeding products:', error);
    }
};



// Middleware
app.use(cors()); // Enables cross-origin requests from the React frontend
app.use(express.json()); // Allows parsing of JSON request bodies

// Simple test route
app.get('/', (req, res) => {
    res.send('Vibe E-Com Backend Running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));