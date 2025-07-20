import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Top-right button */}
      <div className="absolute top-4 right-6">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow text-green-700 dark:text-green-300"
        >
          Account
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg w-40 p-2 space-y-2">
            <Link to="/login" className="block hover:underline">Login</Link>
            <Link to="/signup" className="block hover:underline">Sign Up</Link>
          </div>
        )}
      </div>

      <section className="w-full max-w-2xl bg-white/90 dark:bg-gray-900/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center border border-gray-100 dark:border-gray-800 flex flex-col items-center gap-8">
        <h1 className="text-5xl font-extrabold text-green-700 dark:text-green-400 tracking-tight flex items-center gap-2">
          🌾 L&P Greenfield Farms
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Welcome to the heart of organic produce and innovation. Farmers, admins, and customers collaborate here to grow, share, and thrive together.
        </p>
      </section>
    </div>
  );
}
