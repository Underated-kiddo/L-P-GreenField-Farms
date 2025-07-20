import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const Stats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <div className="p-6">Loading stats...</div>;
  }

  const COLORS = ["#34d399", "#f87171", "#60a5fa", "#fbbf24"];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">📊 Dashboard Stats</h1>

      {/* Profit / Loss Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Profit vs Loss</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.monthlyProfitLoss}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="profit" fill="#34d399" />
            <Bar dataKey="loss" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Product Sales vs Purchases */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Sells vs Purchases</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.salesPurchases}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="purchases" stroke="#fbbf24" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Productivity Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Activity Breakdown</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={stats.productivity}
              dataKey="value"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              label
            >
              {stats.productivity.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Totals Display */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mt-8">
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <p className="text-lg font-bold">{stats.totalSales}</p>
          <p className="text-sm">Total Sales</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <p className="text-lg font-bold">{stats.totalPurchases}</p>
          <p className="text-sm">Total Purchases</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <p className="text-lg font-bold">Ksh {stats.totalProfit}</p>
          <p className="text-sm">Profit</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow">
          <p className="text-lg font-bold">Ksh {stats.totalLoss}</p>
          <p className="text-sm">Loss</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
