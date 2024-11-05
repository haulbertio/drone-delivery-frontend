// src/pages/ProductListing.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = (product, quantity) => {
        const existing = cart.find(item => item.product.id === product.id);
        const updatedCart = existing
            ? cart.map(item =>
                  item.product.id === product.id
                      ? { ...item, quantity: item.quantity + quantity }
                      : item
              )
            : [...cart, { product, quantity }];
        setCart(updatedCart);
    };

    const totalCost = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map(product => (
                    <div key={product.id} className="border p-4 rounded">
                        <h2 className="font-bold">{product.name}</h2>
                        <p>${product.price}</p>
                        <input
                            type="number"
                            defaultValue={1}
                            min={1}
                            onChange={e => addToCart(product, parseInt(e.target.value))}
                            className="mt-2"
                        />
                        <button onClick={() => addToCart(product, 1)} className="bg-black text-white px-4 py-2 rounded mt-4">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-8 p-4 bg-gray-100 rounded">
                <h2 className="text-xl font-bold">Cart Total: ${totalCost.toFixed(2)}</h2>
                <Link to="/cart">
                    <button className="mt-4 bg-black text-white px-6 py-2 rounded">Go to Cart</button>
                </Link>
            </div>
        </div>
    );
};

export default ProductListing;
