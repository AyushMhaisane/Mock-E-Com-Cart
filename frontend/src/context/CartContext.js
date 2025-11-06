import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Create the Context object
const CartContext = createContext();

// 2. Custom hook to easily use the cart context
export const useCart = () => useContext(CartContext);

// 3. Cart Provider Component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [], total: 0 });
    const [loading, setLoading] = useState(false);

    // --- API Interactions ---

    // Function to refresh the cart state from the backend (GET /api/cart)
    const fetchCart = async () => {
        try {
            const response = await axios.get('/api/cart');
            setCart(response.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };
    
    // Function to ADD or UPDATE an item (POST /api/cart)
    // qty is OPTIONAL. If called from ProductGrid, it's 1. If called from CartView, it's the total desired quantity.
    const addItem = async (productId, qty) => {
        setLoading(true);
        try {
            const currentItem = cart.items.find(item => item.productId === productId);
            let finalQty = qty;

            if (!finalQty) {
                // If quantity is not provided (call from ProductGrid):
                // If item exists, increment current quantity by 1. Otherwise, set to 1.
                finalQty = currentItem ? currentItem.quantity + 1 : 1;
            }

            const response = await axios.post('/api/cart', { 
                productId: productId, 
                qty: finalQty // Send the final desired quantity
            });
            
            setCart(response.data);
            
        } catch (error) {
            console.error("Error adding/updating item:", error);
        } finally {
            setLoading(false);
        }
    };
    
    // Function to REMOVE an item (DELETE /api/cart/:id)
    const removeItemFromCart = async (productId) => {
        setLoading(true);
        try {
            await axios.delete(`/api/cart/${productId}`);
            
            // Re-fetch the cart after deletion to update state and total
            await fetchCart(); 
            
        } catch (error) {
            console.error("Error removing item:", error);
        } finally {
            setLoading(false);
        }
    };
    
    // Function to MOCK CHECKOUT (POST /api/checkout)
    const mockCheckout = async (checkoutData) => {
        setLoading(true);
        try {
            // Send user details along with the current cart items (optional, but good practice)
            const response = await axios.post('/api/checkout', {
                items: cart.items,
                ...checkoutData // Includes name/email from the form
            });
            
            // Clear the local cart state immediately upon successful mock transaction
            setCart({ items: [], total: 0 });
            
            return response.data; // Returns the mock receipt
            
        } catch (error) {
            console.error("Error during mock checkout:", error);
            throw error; // Re-throw to be handled by the CheckoutForm
        } finally {
            setLoading(false);
        }
    };
    
    // --- Initial Load ---
    useEffect(() => {
        fetchCart();
    }, []);

    // 4. Value provided by the context
    const contextValue = {
        cart,
        loading,
        addItem,
        removeItemFromCart, // NEW: For CartItem.js
        mockCheckout,       // NEW: For CheckoutForm.js
        fetchCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};