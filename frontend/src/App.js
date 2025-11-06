import React, { useState } from 'react';
import ProductGrid from './pages/ProductGrid';
import CartView from './pages/CartView';
import CheckoutForm from './components/CheckoutForm';
import { CartProvider, useCart } from './context/CartContext';

// Component to handle the routing state and display logic
const AppContent = () => {
    const [view, setView] = useState('products'); // 'products', 'cart', or 'checkout'
    const { cart } = useCart();

    // Function to handle moving from modal back to product view
    const handleCheckoutComplete = () => {
        // Reset view back to products after successful checkout
        setView('products');
    };

    const renderView = () => {
        if (view === 'cart') {
            // Added new prop: onBackToProducts
            return (
                <CartView
                    onProceedToCheckout={() => setView('checkout')}
                    onBackToProducts={() => setView('products')} // <-- NEW PROP
                />
            );
        }
        if (view === 'checkout') {
            return (
                <CheckoutForm
                    onBack={() => setView('cart')}
                    onCheckoutComplete={handleCheckoutComplete}
                />
            );
        }
        return <ProductGrid />;
    };

    return (
        <div className="App">
            <header style={styles.header}>
                <h1 style={styles.title}>Vibe Commerce</h1>
                <nav>
                    <button style={styles.navButton} onClick={() => setView('products')}>
                        Products
                    </button>
                    <button style={styles.navButton} onClick={() => setView('cart')}>
                        🛒 Cart ({cart.items.length}) - ₹{cart.total.toFixed(2)}
                    </button>
                </nav>
            </header>
            <main style={styles.main}>{renderView()}</main>
        </div>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #eee',
    },
    title: { margin: 0, color: '#007bff' },
    navButton: {
        margin: '0 10px',
        padding: '10px 15px',
        border: '1px solid #007bff',
        backgroundColor: 'white',
        color: '#007bff',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    main: { padding: '20px' },
};

function App() {
    return (
        <CartProvider>
            <AppContent />
        </CartProvider>
    );
}

export default App;
