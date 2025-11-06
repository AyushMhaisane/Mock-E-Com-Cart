import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load products. Is the backend running?");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array means this runs once on mount

    if (loading) {
        return <h2 style={{textAlign: 'center', marginTop: '50px'}}>Loading Products...</h2>;
    }

    if (error) {
        return <h2 style={{textAlign: 'center', color: 'red', marginTop: '50px'}}>{error}</h2>;
    }

    return (
        <div className="product-grid-container" style={styles.gridContainer}>
            <h1 style={{width: '100%', textAlign: 'center'}}>Available Products</h1>
            <div style={styles.grid}>
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

const styles = {
    gridContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center', // Center cards horizontally
    }
};

export default ProductGrid;