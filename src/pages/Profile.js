// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/profile/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile", error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>
            {profile.vessel_callsign && <p><strong>Vessel Callsign:</strong> {profile.vessel_callsign}</p>}
        </div>
    );
};

export default Profile;
