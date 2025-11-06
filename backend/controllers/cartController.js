// backend/controllers/cartController.js

const Cart = require('../models/Cart');
const Product = require('../models/Product');
const MOCK_USER_ID = 'mock_user_1'; // Consistent ID for mock user persistence

// --- Helper Function ---
// Fetches the mock user's cart from the DB, creating one if it doesn't exist.
const getOrCreateCart = async () => {
    let cart = await Cart.findOne({ userId: MOCK_USER_ID });
    if (!cart) {
        cart = new Cart({ userId: MOCK_USER_ID, items: [] });
        await cart.save();
    }
    return cart;
};
// -----------------------


// GET /api/cart: Get cart contents and calculate total
exports.getCart = async (req, res) => {
    try {
        const cart = await getOrCreateCart();

        // Calculate Total (Server-Side Calculation)
        const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Return cart items and the calculated total
        return res.json({ items: cart.items, total: parseFloat(total.toFixed(2)) }); 
    } catch (error) {
        console.error('Error in getCart:', error);
        return res.status(500).json({ message: 'Error retrieving cart.' });
    }
};


// POST /api/cart: Add or update item quantity
exports.addItemToCart = async (req, res) => {
    // Expects { productId: 'p1', qty: 1 } for adding, or { productId: 'p1', qty: 5 } for updating
    const { productId, qty } = req.body; 

    // Basic validation
    if (!productId || typeof qty !== 'number' || qty < 1) {
        return res.status(400).json({ message: 'Invalid product ID or quantity.' });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        const cart = await getOrCreateCart();
        const itemIndex = cart.items.findIndex(item => item.productId === productId);

        if (itemIndex > -1) {
            // Item exists: update quantity
            cart.items[itemIndex].quantity = qty;
        } else {
            // Item does not exist: add new item
            cart.items.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: qty,
            });
        }

        await cart.save();
        // Respond with the updated cart details
        const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return res.status(200).json({ items: cart.items, total: parseFloat(total.toFixed(2)) });
        
    } catch (error) {
        console.error('Error in addItemToCart:', error);
        return res.status(500).json({ message: 'Error adding item to cart.' });
    }
};


// DELETE /api/cart/:id: Remove item
exports.removeItemFromCart = async (req, res) => {
    const productIdToRemove = req.params.id;

    try {
        const cart = await getOrCreateCart();

        // Filter out the item with the matching productId
        const initialLength = cart.items.length;
        cart.items = cart.items.filter(item => item.productId !== productIdToRemove);

        if (cart.items.length === initialLength) {
             return res.status(404).json({ message: 'Item not found in cart.' });
        }

        await cart.save();
        // Respond with the updated cart details
        const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return res.status(200).json({ items: cart.items, total: parseFloat(total.toFixed(2)) });
        
    } catch (error) {
        console.error('Error in removeItemFromCart:', error);
        return res.status(500).json({ message: 'Error removing item from cart.' });
    }
};


// POST /api/checkout: Mock checkout process
exports.mockCheckout = async (req, res) => {
    try {
        const cart = await getOrCreateCart();
        
        if (cart.items.length === 0) {
             return res.status(400).json({ message: 'Cannot checkout with an empty cart.' });
        }

        // Calculate final total
        const finalTotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Create mock receipt
        const receipt = {
            receiptId: Math.random().toString(36).substring(2, 9).toUpperCase(),
            total: parseFloat(finalTotal.toFixed(2)),
            timestamp: new Date().toISOString(),
            status: 'Success',
            itemsPurchased: cart.items.length,
        };

        // Clear the cart after mock checkout
        cart.items = [];
        await cart.save();

        return res.status(201).json(receipt); // 201 Created for a successful transaction
    } catch (error) {
        console.error('Error in mockCheckout:', error);
        return res.status(500).json({ message: 'Error during mock checkout.' });
    }
};