import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabaseClient"; // Adjust path if needed

export default function ManagerLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      // End session
      await supabase.auth.signOut();

      // Clear any local/session storage if used for auth
      localStorage.clear();
      sessionStorage.clear();

      // Redirect to login page and replace history so back button doesn't return
      navigate("/login", { replace: true });
    };

    logout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-xl text-blue-700">
      Logging out...
    </div>
  );
}
