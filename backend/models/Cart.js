// backend/models/Cart.js
const mongoose = require('mongoose');

// Schema for a single item within the cart array
const CartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
}, { _id: false });

// Schema for the user's shopping cart
const CartSchema = new mongoose.Schema({
    // For this mock project, use a single hardcoded ID like 'mock_user'
    userId: { type: String, required: true, unique: true, default: 'mock_user' },
    items: [CartItemSchema], // Array of CartItemSchema
});

module.exports = mongoose.model('Cart', CartSchema);