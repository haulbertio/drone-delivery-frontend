// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import CustomerDashboard from './pages/CustomerDashboard';
import PilotDashboard from './pages/PilotDashboard';
import ProductListing from './pages/ProductListing';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="p-4">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/customer" element={<CustomerDashboard />} />
                    <Route path="/pilot" element={<PilotDashboard />} />
                    <Route path="/products" element={<ProductListing />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
