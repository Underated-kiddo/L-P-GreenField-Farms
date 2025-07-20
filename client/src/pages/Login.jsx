import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password })
            localStorage.setItem("token", data.token)
            // Decode role from JWT if not present in response
            let role = data.role
            if (!role && data.token) {
                const decoded = jwtDecode(data.token)
                role = decoded.role
            }
            localStorage.setItem("role", role)
            if (role === "admin") navigate("/admin")
            else if (role === "farmer") navigate("/dashboard") // You can change this if you have a separate farmer dashboard
            else navigate("/dashboard")
        } catch (err) {
            alert("Login failed: " + (err?.response?.data?.message || err.message || "Unknown error"));
        }
    }

    return (
    <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 w-80">
        <h2 className="text-2xl font-bold">Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}
            className="w-full border p-2 rounded"/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}
            className="w-full border p-2 rounded"/>
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Login
        </button>
        </form>
    </div>
    )
}
