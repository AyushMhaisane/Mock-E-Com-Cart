import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ReceiptModal from './ReceiptModal';

const CheckoutForm = ({ onBack, onCheckoutComplete }) => {
    const { cart, mockCheckout, loading } = useCart();
    
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [error, setError] = useState('');
    const [receipt, setReceipt] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (cart.items.length === 0) {
            setError("Your cart is empty. Please add items before checking out.");
            return;
        }
        if (!formData.name || !formData.email) {
            setError("Please fill in both name and email.");
            return;
        }

        try {
            // Call the mockCheckout function from context
            const receiptData = await mockCheckout(formData);
            setReceipt(receiptData); // Store receipt data to display the modal
            
        } catch (err) {
            setError("Checkout failed. Please try again later.");
        }
    };

    const handleModalClose = () => {
        setReceipt(null); // Hide the modal
        onCheckoutComplete(); // Return to the product view in App.js
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Finalizing Order</h2>
            <div style={styles.summary}>
                Total Due: <span style={styles.totalAmount}>${cart.total.toFixed(2)}</span>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                {error && <p style={styles.error}>{error}</p>}
                
                <label style={styles.label}>Full Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required style={styles.input} />

                <label style={styles.label}>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required style={styles.input} />

                <button type="submit" disabled={loading || cart.items.length === 0} style={styles.submitButton}>
                    {loading ? 'Processing...' : `Pay $${cart.total.toFixed(2)} Now`}
                </button>
                <button type="button" onClick={onBack} style={styles.backButton}>
                    ← Back to Cart
                </button>
            </form>

            {/* Receipt Modal Display */}
            <ReceiptModal receipt={receipt} onClose={handleModalClose} />
        </div>
    );
};

const styles = {
    container: { maxWidth: '500px', margin: '30px auto', padding: '25px', border: '1px solid #ddd', borderRadius: '10px' },
    header: { textAlign: 'center', marginBottom: '20px' },
    summary: { textAlign: 'center', fontSize: '1.5em', marginBottom: '20px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' },
    totalAmount: { color: '#dc3545', fontWeight: 'bold' },
    form: { display: 'flex', flexDirection: 'column' },
    label: { marginTop: '10px', marginBottom: '5px', fontWeight: 'bold' },
    input: { padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' },
    error: { color: '#dc3545', textAlign: 'center', marginBottom: '15px' },
    submitButton: { padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1.1em', marginTop: '10px' },
    backButton: { padding: '12px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1.1em', marginTop: '10px' }
};

export default CheckoutForm;