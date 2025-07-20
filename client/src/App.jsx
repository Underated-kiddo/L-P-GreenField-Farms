import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import AdminDashboard from "./pages/AdminDashboard"
import FarmingTips from "./pages/FarmingTips"
import HotDeals from "./pages/HotDeals"
import Services from "./pages/Services"
import Stats from "./pages/Stats"
import Chats from "./pages/Chats"
import Account from "./pages/Account"
import Cart from "./pages/Cart"

export default function App() {
  return (
    <div className="min-h-screen bg-green-50 dark:bg-green-900 text-gray-800 dark:text-gray-200">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/farming-tips" element={<FarmingTips />} />
        <Route path="/hot-deals" element={<HotDeals />} />
        <Route path="/services" element={<Services />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  )
}

