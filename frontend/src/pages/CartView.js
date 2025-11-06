import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem'; 

// Added onBackToProducts prop
const CartView = ({ onProceedToCheckout, onBackToProducts }) => {
    const { cart, loading } = useCart();

    if (loading) {
        return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading Cart...</h2>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>🛒 Your Shopping Cart</h1>
            
            {cart.items.length === 0 ? (
                <>
                    <p style={styles.emptyMessage}>Your cart is empty. Start adding some Vibe Commerce products!</p>
                    <button style={styles.continueButton} onClick={onBackToProducts}>
                        ← Continue Shopping
                    </button>
                </>
            ) : (
                <>
                    <button style={styles.continueButton} onClick={onBackToProducts}>
                        ← Continue Shopping
                    </button>
                    <div style={styles.itemList}>
                        {cart.items.map(item => (
                            <CartItem key={item.productId} item={item} />
                        ))}
                    </div>
                    
                    <div style={styles.summary}>
                        <h2>Order Summary</h2>
                        <div style={styles.totalRow}>
                            <span>Subtotal:</span>
                            <span style={styles.totalAmount}>${cart.total.toFixed(2)}</span>
                        </div>
                        <p style={{marginTop: '15px'}}>Taxes and shipping calculated at checkout.</p>
                        
                        <button 
                            style={styles.checkoutButton}
                            onClick={onProceedToCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    container: { maxWidth: '900px', margin: '30px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' },
    header: { textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' },
    emptyMessage: { textAlign: 'center', color: '#888', fontSize: '1.2em', padding: '50px 0' },
    itemList: { marginBottom: '30px' },
    summary: { borderTop: '2px solid #eee', paddingTop: '20px', textAlign: 'right' },
    totalRow: { fontSize: '1.5em', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', marginTop: '10px' },
    totalAmount: { color: '#dc3545' },
    checkoutButton: { width: '100%', padding: '15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1.2em', cursor: 'pointer', marginTop: '20px' },
    continueButton: { padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' } // New style
};

export default CartView;