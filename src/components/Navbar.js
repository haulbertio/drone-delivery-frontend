// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
    const [username, setUsername] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Check if the user is authenticated by looking for a token

    useEffect(() => {
        const fetchProfile = async () => {
            if (token) {
                try {
                    const response = await axios.get('/api/profile/', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUsername(response.data.username);
                } catch (error) {
                    console.error("Failed to fetch profile", error);
                    setUsername(null); // Reset username if profile fetch fails
                }
            }
        };
        fetchProfile();
    }, [token]);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token on logout
        setUsername(null);
        setIsDropdownOpen(false);
        navigate('/signout-success'); // Redirect to a sign-out success page
    };

    return (
        <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-400 bg-gray-100">
            <Link to="/" className="text-xl font-bold text-primary">
                Drone Delivery
            </Link>
            <div className="space-x-4">
                {username ? (
                    <div className="relative inline-block">
                        <button onClick={toggleDropdown} className="text-gray-700 hover:underline">
                            {username}
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    My Profile
                                </Link>
                                <Link to="/my-orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    My Orders
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="text-gray-700 hover:underline">
                            Login
                        </Link>
                        <Link to="/signup" className="text-gray-700 hover:underline">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
