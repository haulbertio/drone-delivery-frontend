// src/pages/PilotDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PilotDashboard() {
    const [orders, setOrders] = useState([]);
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOrders();
        fetchMissions();
    }, []);

    // Fetch orders ready for delivery
    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/orders/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders", error);
        }
    };

    // Fetch existing missions
    const fetchMissions = async () => {
        try {
            const response = await axios.get('/api/drone_missions/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setMissions(response.data);
        } catch (error) {
            console.error("Error fetching missions", error);
        }
    };

    // Initiate a drone mission for an order
    const initiateMission = async (orderId) => {
        setLoading(true);
        try {
            const response = await axios.post(
                '/api/drone_missions/',
                { order: orderId, mission_status: 'In Progress' },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setMissions([...missions, response.data]);
            alert("Mission initiated successfully!");
        } catch (error) {
            console.error("Error initiating mission", error);
        } finally {
            setLoading(false);
        }
    };

    // Mark a mission as completed
    const completeMission = async (missionId) => {
        setLoading(true);
        try {
            const response = await axios.patch(
                `/api/drone_missions/${missionId}/`,
                { mission_status: 'Completed' },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setMissions(missions.map(mission => 
                mission.id === missionId ? response.data : mission
            ));
            alert("Mission completed!");
        } catch (error) {
            console.error("Error completing mission", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Pilot Dashboard</h1>
            
            {/* Display Orders */}
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Orders Needing Delivery</h2>
                <div className="grid grid-cols-2 gap-4">
                    {orders.map(order => (
                        <div key={order.id} className="border p-4 rounded transform transition duration-300 hover:scale-105">
                            <h3>Order ID: {order.id}</h3>
                            <p>Customer: {order.customer_name}</p>
                            <p>Status: {order.order_status}</p>
                            <button
                                onClick={() => initiateMission(order.id)}
                                disabled={loading}
                                className="mt-4 bg-black text-white px-4 py-2 rounded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-2"
                            >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m7-7H5" />
                                </svg>
                                Initiate Mission
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Display Missions */}
            <section>
                <h2 className="text-xl font-bold mb-4">Active Missions</h2>
                <div className="grid grid-cols-2 gap-4">
                    {missions.map(mission => (
                        <div key={mission.id} className="border p-4 rounded">
                            <h3>Mission ID: {mission.id}</h3>
                            <p>Order ID: {mission.order}</p>
                            <p>Status: {mission.mission_status}</p>
                            {mission.mission_status === 'In Progress' && (
                                <button
                                    onClick={() => completeMission(mission.id)}
                                    disabled={loading}
                                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Complete Mission
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default PilotDashboard;
