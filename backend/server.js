// backend/server.js


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Product = require('./models/Product'); // Import the model
const mockProducts = require('./data/mockProducts');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());        // Enables cross-origin requests
app.use(express.json()); // Allows parsing of JSON request bodies

// Simple test route
app.get('/', (req, res) => {
    res.send('Vibe E-Com Backend Running!');
});


const productRoutes = require('./routes/productRoutes'); 
const cartRoutes = require('./routes/cartRoutes');


// --- Routes ---
app.use('/api/products', productRoutes); // Use the product router
app.use('/api/cart', cartRoutes); // Use the cart router

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

// --- Mongoose Connection ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
    .then(() => seedProducts()) // Seed data after successful connection
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));