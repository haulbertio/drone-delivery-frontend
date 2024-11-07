// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupSuccess from './pages/SignupSuccess';
import LandingPage from './pages/LandingPage';
import CustomerDashboard from './pages/CustomerDashboard';
import PilotDashboard from './pages/PilotDashboard';
import ProductListing from './pages/ProductListing';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';  // New page for customer orders
import Profile from './pages/Profile';  // New page for user profile
import SignOutSuccess from './pages/SignOutSuccess';  // New page for sign-out success

function App() {
    return (
        <Router>
            <Navbar />
            <div className="p-4">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signup-success" element={<SignupSuccess />} />
                    <Route path="/customer" element={<CustomerDashboard />} />
                    <Route path="/pilot" element={<PilotDashboard />} />
                    <Route path="/products" element={<ProductListing />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/my-orders" element={<MyOrders />} />  {/* My Orders page */}
                    <Route path="/profile" element={<Profile />} />  {/* Profile page */}
                    <Route path="/signout-success" element={<SignOutSuccess />} />  {/* Sign-out success page */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
