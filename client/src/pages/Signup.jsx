import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("Customer")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, { name, email, password, role })
        localStorage.setItem("token", data.token)
        localStorage.setItem("role", data.role)
        if (data.role === "admin" || role.toLowerCase() === "admin") navigate("/admin")
        else navigate("/dashboard")
    } catch (err) {
        alert("Sign up failed")
    }
}

    return (
    <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 w-80">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}
            className="w-full border p-2 rounded"/>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}
            className="w-full border p-2 rounded"/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}
            className="w-full border p-2 rounded"/>
        <select value={role} onChange={(e)=>setRole(e.target.value)}
            className="w-full border p-2 rounded">
            <option value="Customer">Customer</option>
            <option
            value="Farmer">Farmer</option>
            <option value="Admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Sign Up
        </button>
        </form>
    </div>
    )
}