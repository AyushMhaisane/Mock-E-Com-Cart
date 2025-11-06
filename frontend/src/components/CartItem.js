import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { addItem, removeItemFromCart } = useCart();
    
    const itemTotal = item.price * item.quantity;

    // Handler for quantity change (input field or +/- buttons)
    const handleQuantityChange = (event) => {
        let newQty = parseInt(event.target.value);
        if (isNaN(newQty) || newQty < 1) return; // Prevent invalid input

        // Calls POST /api/cart to update the total quantity
        addItem(item.productId, newQty); 
    };

    // Handler for removing the item entirely
    const handleRemove = () => {
        // Calls DELETE /api/cart/:id
        removeItemFromCart(item.productId);
    };

    return (
        <div style={styles.itemContainer}>
            <div style={styles.details}>
                <h3 style={styles.name}>{item.name}</h3>
                <p style={styles.price}>${item.price.toFixed(2)} each</p>
            </div>
            
            <div style={styles.controls}>
                <label style={{marginRight: '10px'}}>Qty:</label>
                <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={handleQuantityChange}
                    style={styles.quantityInput}
                />
            </div>
            
            <div style={styles.totalPrice}>
                Total: ${itemTotal.toFixed(2)}
            </div>
            
            <button onClick={handleRemove} style={styles.removeButton}>
                Remove
            </button>
        </div>
    );
};

const styles = {
    itemContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px dotted #eee' },
    details: { flex: 2 },
    name: { fontSize: '1.1em', margin: 0 },
    price: { color: '#6c757d', fontSize: '0.9em' },
    controls: { display: 'flex', alignItems: 'center', flex: 1, minWidth: '150px' },
    quantityInput: { width: '50px', padding: '5px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px' },
    totalPrice: { flex: 1, fontWeight: 'bold', textAlign: 'right' },
    removeButton: { padding: '8px 12px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '20px' }
};

export default CartItem;