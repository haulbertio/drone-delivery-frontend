// src/pages/CustomerDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CustomerDashboard() {
   const [products, setProducts] = useState([]);
   const [cart, setCart] = useState([]);

   useEffect(() => {
       // Fetch products from API
       const fetchProducts = async () => {
           try {
               const response = await axios.get('/api/products/', {
                   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
               });
               setProducts(response.data);
           } catch (error) {
               console.error("Error fetching products", error);
           }
       };
       fetchProducts();
   }, []);

   const addToCart = (product) => {
       setCart([...cart, product]);
   };

   const handleCheckout = async () => {
       try {
           const response = await axios.post('/api/orders/', { items: cart }, {
               headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
           });
           alert("Order placed successfully!");
           setCart([]); // Clear the cart after checkout
       } catch (error) {
           console.error("Checkout failed", error);
       }
   };

   return (
       <div className="p-8">
           <h1 className="text-2xl font-bold mb-6">Customer Dashboard</h1>
           <div className="grid grid-cols-3 gap-4">
               {products.map((product) => (
                   <div key={product.id} className="border rounded p-4 transform transition duration-300 hover:scale-105">
                       <h2>className="font-bold">{product.name}</h2>
                       <button onClick={() => addToCart(product)} className="mt-4 bg-black text-white px-4 py-2 rounded">
                           Add to Cart
                       </button>
                   </div>
               ))}
           </div>
           <div className="mt-6">
               <h2 className="text-xl font-bold">Cart</h2>
               <ul>
                   {cart.map((item, index) => (
                       <li key={index}>{item.name}</li>
                   ))}
               </ul>
               <button onClick={handleCheckout} className="mt-4 bg-black text-white px-4 py-2 rounded">Checkout</button>
           </div>
       </div>
   );
}

export default CustomerDashboard;
