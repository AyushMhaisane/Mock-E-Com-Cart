import axios from 'axios';

// The proxy setting in package.json will redirect /api/products to http://localhost:5000/api/products
const API_URL = '/api/products';

export const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        // Throw the error so the component can handle it
        throw error;
    }
};