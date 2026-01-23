import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Call backend to end session
    fetch("/api/logout", { method: "POST", credentials: "include" })
      .finally(() => {
        // Clear user session data
        localStorage.clear();
        sessionStorage.clear();
        // Redirect to login page
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
