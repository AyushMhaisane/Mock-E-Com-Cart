// backend/routes/cartRoutes.js (Start of file)
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.addItemToCart);
router.delete('/:id', cartController.removeItemFromCart);
router.get('/', cartController.getCart); // Added
router.post('/checkout', cartController.mockCheckout); // Added

module.exports = router;