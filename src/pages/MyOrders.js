// src/pages/MyOrders.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch orders from API
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                console.log(response.data); // Log the response data
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return <p>Loading orders...</p>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>
            {orders.length === 0 ? (
                <p className="text-gray-700">You currently have no orders being processed.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {orders.map((order) => (
                        <div key={order.id} className="border rounded p-4">
                            <h2 className="font-bold">Order ID: {order.id}</h2>
                            <p>Status: {order.order_status}</p>
                            <div className="mt-4">
                                <h3 className="font-semibold">Items:</h3>
                                <ul>
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.product.name} - {item.quantity} x ${item.product.price.toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <p className="mt-4 font-semibold">
                                Total: ${order.items.reduce((total, item) => total + item.quantity * item.product.price, 0).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyOrders;
