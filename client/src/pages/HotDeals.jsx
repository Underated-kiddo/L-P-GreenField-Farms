import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance"; // adjust if in a different path

const HotDeals = () => {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    api.get("/admin/adverts")
      .then(res => setAdverts(res.data))
      .catch(() => setAdverts([]));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hot Deals</h1>
      {adverts.length === 0 ? (
        <p>No hot deals available.</p>
      ) : (
        <div className="grid gap-4">
          {adverts.map(advert => (
            <div key={advert._id} className="border rounded p-4 bg-white shadow">
              <div className="font-semibold mb-2">{advert.text}</div>
              {advert.images && advert.images[0] && (
                <img src={advert.images[0]} alt="advert" className="w-full h-32 object-cover" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotDeals;
