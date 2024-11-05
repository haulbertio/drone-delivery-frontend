// src/pages/Checkout.js
import React from 'react';

const Checkout = ({ cart }) => {
    const totalCost = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <h2 className="text-lg mb-2">Shipping Address</h2>
            <input className="border p-2 mb-4 w-full" placeholder="123 Main St, City, Country" />
            <h2 className="text-lg mb-2">Payment Method</h2>
            <input className="border p-2 mb-4 w-full" placeholder="Card Number" />
            <h2 className="text-xl font-bold mt-6">Total: ${totalCost.toFixed(2)}</h2>
            <button className="mt-4 bg-black text-white px-6 py-2 rounded">Place Order</button>
        </div>
    );
};

export default Checkout;
