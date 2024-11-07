// src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
    <div className="container mx-auto p-6">
        <section className="hero flex items-center justify-between py-20">
            <div>
                <h1 className="text-4xl font-bold">Welcome to Drone Delivery</h1>
                <p className="mt-4 text-lg">
                    Experience the convenience of grocery delivery via drone!
                </p>
                <div className="mt-8">
                    <Link to="/signup">
                        <button className="bg-black text-white px-6 py-2 rounded">Get Started</button>
                    </Link>
                </div>
            </div>
            <img src="/images/drone-hero.jpg" alt="Drone Delivery" className="w-1/2" />
        </section>
        <section className="features py-12">
            <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
            <div className="grid grid-cols-3 gap-6">
                <div className="feature-card p-4 bg-gray-100 rounded">
                    <h3 className="font-bold">Fast Delivery</h3>
                    <p>Our drones deliver your groceries in minutes.</p>
                </div>
                <div className="feature-card p-4 bg-gray-100 rounded">
                    <h3 className="font-bold">Fresh Groceries</h3>
                    <p>Quality groceries delivered right to your door.</p>
                </div>
                <div className="feature-card p-4 bg-gray-100 rounded">
                    <h3 className="font-bold">Eco-Friendly</h3>
                    <p>Our drones are environmentally friendly.</p>
                </div>
            </div>
        </section>
    </div>
);

export default LandingPage;
