import React from 'react';
import { useCart } from '../context/CartContext'; // Import the hook

const ProductCard = ({ product }) => {
    // Access the addItem function and loading state from the context
    const { addItem, loading } = useCart();
    
    // Event handler for the button click
    const handleAddToCart = () => {
        // Pass the product ID to the addItem function
        addItem(product._id);
    };

    return (
        <div className="product-card" style={styles.card}>
            <h3 style={styles.name}>{product.name}</h3>
            <p style={styles.price}>${product.price.toFixed(2)}</p>
            <p style={styles.description}>{product.description}</p>
            
            <button 
                style={styles.button}
                onClick={handleAddToCart}
                disabled={loading} // Disable button while loading/request is processing
            >
                {loading ? 'Adding...' : 'Add to Cart'}
            </button>
        </div>
    );
};



// Basic inline styling for a quick start
const styles = {
    card: {
        border: '1px solid #ccc',
        padding: '15px',
        margin: '10px',
        borderRadius: '8px',
        width: '300px',
        textAlign: 'center',
    },
    name: {
        fontSize: '1.2em',
        marginBottom: '5px',
    },
    price: {
        color: 'green',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    description: {
        fontSize: '0.9em',
        color: '#555',
        marginBottom: '15px',
    },
    button: {
        padding: '8px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    }
};

export default ProductCard;