// backend/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Using String for ID consistency with mock data
    name: { type: String, required: true },
    price: { type: Number, required: true }, // Store price as a number
    description: { type: String },
}, { _id: false }); // Disable Mongoose's default _id, use our custom one

module.exports = mongoose.model('Product', ProductSchema);