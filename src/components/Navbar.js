// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-400 bg-gray-100">
            <Link to="/" className="text-xl font-bold text-primary">
                Drone Delivery
            </Link>
            <div className="space-x-4">
                <Link to="/customer" className="text-gray-700 hover:underline">
                    Customer Dashboard
                </Link>
                <Link to="/pilot" className="text-gray-700 hover:underline">
                    Pilot Dashboard
                </Link>
                <button onClick={handleLogout} className="text-red-600 hover:underline">
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
