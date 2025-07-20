import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmingTips = () => {
  const [tips, setTips] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/admin/tips`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTips(res.data))
      .catch(() => setTips([]));
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Farming Tips</h1>
      {tips.length === 0 ? (
        <p>No tips available.</p>
      ) : (
        <div className="grid gap-4">
          {tips.map(tip => (
            <div key={tip._id} className="border rounded p-4 bg-white shadow">
              <div className="font-semibold mb-2">{tip.text}</div>
              {tip.images && tip.images[0] && (
                <img src={tip.images[0]} alt="tip" className="w-full h-32 object-cover" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmingTips;
