// src/pages/SignupSuccess.js
import React from 'react';
import { Link } from 'react-router-dom';

const SignupSuccess = () => (
    <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Signup Successful!</h1>
        <p>You can now log in with your new account.</p>
        <Link to="/login" className="text-blue-500 underline mt-4 inline-block">
            Go to Login
        </Link>
    </div>
);

export default SignupSuccess;
