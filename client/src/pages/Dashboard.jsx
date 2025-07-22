import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/dashboard", { withCredentials: true })
      .then((res) => {
        const { role } = res.data;

        if (role === "admin") navigate("/admin-dashboard");
        else if (role === "farmer") navigate("/farmer-dashboard");
        else navigate("/customer-dashboard");
      })
      .catch((err) => {
        console.error("Unauthorized:", err.response?.data?.message || err.message);
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  return loading ? <div className="text-center mt-10">Loading...</div> : null;
}
