// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();

   const handleLogin = async (e) => {
       e.preventDefault();
       try {
           const response = await axios.post('/api/token/', { username, password });
           localStorage.setItem('token', response.data.access);

           // Redirect based on user role (assume role fetched or determined)
           // Placeholder logic, adapt based on backend response
           const userRole = 'customer'; // or 'pilot'
           navigate(userRole === 'customer' ? '/customer' : '/pilot');
       } catch (error) {
           console.error("Login failed", error);
       }
   };

   return (
       <div className="min-h-screen flex items-center justify-center">
           <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
               <h2 className="text-xl font-bold mb-6">Login</h2>
               <input
                   type="text"
                   placeholder="Username"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   className="border rounded w-full py-2 px-3 mb-3"
               />
               <input
                   type="password"
                   placeholder="Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="border rounded w-full py-2 px-3 mb-3"
               />
               <button type="submit" className="bg-black text-white py-2 px-4 rounded">Login</button>
           </form>
       </div>
   );
}

export default Login;
