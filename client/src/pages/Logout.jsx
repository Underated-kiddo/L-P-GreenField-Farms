import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance"; // adjust path if needed

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/auth/logout")
      .finally(() => {
        localStorage.removeItem("user");
        navigate("/login");
      });
  }, []);

  return <p>Logging out...</p>;
}
