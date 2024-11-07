// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [vesselCallsign, setVesselCallsign] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup/`, {
                username,
                email,
                password,
                role,
                vessel_callsign: vesselCallsign,
            });
            if (response.status === 201) {
                navigate('/signup-success');  // Redirect to success confirmation page
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Signup</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSignup}>
                <div className="mb-4">
                    <label className="block">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 w-full"
                        required
                        placeholder="8+ chars, uppercase, lowercase, number, special char"
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border p-2 w-full"
                    >
                        <option value="customer">Customer</option>
                        <option value="pilot">Pilot</option>
                    </select>
                </div>
                {role === 'customer' && (
                    <div className="mb-4">
                        <label className="block">Vessel Callsign</label>
                        <input
                            type="text"
                            value={vesselCallsign}
                            onChange={(e) => setVesselCallsign(e.target.value)}
                            className="border p-2 w-full"
                        />
                    </div>
                )}
                <button type="submit" className="bg-black text-white px-4 py-2 rounded">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
