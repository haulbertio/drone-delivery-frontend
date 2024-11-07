// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/token/`, { username, password });
            localStorage.setItem('token', response.data.access);

            // Optional: Fetch user profile to get the role
            const profileResponse = await axios.get(`${process.env.REACT_APP_API_URL}/profile/`, {
                headers: {
                    Authorization: `Bearer ${response.data.access}`,
                },
            });

            const userRole = profileResponse.data.role; // Assuming the backend returns role in the profile
            if (userRole === 'customer') {
                navigate('/customer');
            } else if (userRole === 'pilot') {
                navigate('/pilot');
            } else {
                setError('Unknown user role');
            }
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error("Login failed", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
                <h2 className="text-xl font-bold mb-6">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border rounded w-full py-2 px-3 mb-3"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded w-full py-2 px-3 mb-3"
                    required
                />
                <button type="submit" className="bg-black text-white py-2 px-4 rounded">Login</button>
            </form>
        </div>
    );
}

export default Login;
