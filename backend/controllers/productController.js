// backend/controllers/productController.js
const Product = require('../models/Product');

// GET /api/products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.json(products);
    } catch (error) {
        console.error(error);
        // Internal Server Error
        return res.status(500).json({ message: 'Error fetching products.' });
    }
};