// src/pages/Cart.js
import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, updateQuantity, removeItem }) => {
    const totalCost = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart.map(item => (
                <div key={item.product.id} className="border p-4 rounded flex justify-between items-center">
                    <h2 className="font-bold">{item.product.name}</h2>
                    <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={e => updateQuantity(item.product.id, parseInt(e.target.value))}
                        className="w-20 text-center"
                    />
                    <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeItem(item.product.id)} className="text-red-600">Remove</button>
                </div>
            ))}
            <h2 className="text-xl font-bold mt-6">Total: ${totalCost.toFixed(2)}</h2>
            <Link to="/checkout">
                <button className="mt-4 bg-black text-white px-6 py-2 rounded">Proceed to Checkout</button>
            </Link>
        </div>
    );
};

export default Cart;
