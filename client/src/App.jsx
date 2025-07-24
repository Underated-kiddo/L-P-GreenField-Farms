import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Settings from "./pages/Settings";

// Role-based dashboards
import Dashboard from "./pages/Dashboard"; // fallback/legacy
import AdminDashboard from "./pages/AdminDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

// Common features
import FarmingTips from "./pages/FarmingTips";
import HotDeals from "./pages/HotDeals";
import Services from "./pages/Services";
import Stats from "./pages/Stats";
import Chats from "./pages/Chats";
import Account from "./pages/Account";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <div className="min-h-screen bg-green-50 dark:bg-green-900 text-gray-800 dark:text-gray-200">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Shared Legacy Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Role-Based Dashboards */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />

        {/* Common Functional Pages */}
        <Route path="/farming-tips" element={<FarmingTips />} />
        <Route path="/settings" element={<Settings />} />

        {/* Additional Features */}
        <Route path="/hot-deals" element={<HotDeals />} />
        <Route path="/services" element={<Services />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}
