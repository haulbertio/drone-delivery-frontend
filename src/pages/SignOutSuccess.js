// src/pages/SignOutSuccess.js
import React from 'react';
import { Link } from 'react-router-dom';

const SignOutSuccess = () => (
    <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">You have successfully signed out.</h1>
        <p>Thank you for visiting Drone Delivery.</p>
        <Link to="/" className="text-blue-500 underline mt-4 inline-block">
            Return to Home
        </Link>
    </div>
);

export default SignOutSuccess;
