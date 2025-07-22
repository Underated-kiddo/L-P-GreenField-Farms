import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true })
      .finally(() => {
        localStorage.removeItem("user");
        navigate("/login");
      });
  }, []);

  return <p>Logging out...</p>;
}
