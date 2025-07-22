import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { user } = res.data;

      // Save user in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "farmer":
          navigate("/farmer/dashboard");
          break;
        case "customer":
          navigate("/customer/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-lime-200 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-green-700 dark:text-white">
          Login to Greenfield Farms
        </h2>

        {error && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-700 hover:underline dark:text-green-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
