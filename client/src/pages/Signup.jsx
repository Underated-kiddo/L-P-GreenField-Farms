import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Register the user
      await axios.post("http://localhost:5000/api/auth/signup", form, {
        withCredentials: true,
      });

      // Fetch profile to get the role
      const { data } = await axios.get("http://localhost:5000/api/auth/profile", {
        withCredentials: true,
      });

      // Redirect based on role
      if (data.role === "farmer") navigate("/farmer-dashboard");
      else if (data.role === "admin") navigate("/admin-dashboard");
      else navigate("/customer-dashboard");
    } catch (err) {
      console.error("Signup failed:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Create Account</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border mb-3 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <select
          className="w-full p-2 border mb-3 rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="customer">Customer</option>
          <option value="farmer">Farmer</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
