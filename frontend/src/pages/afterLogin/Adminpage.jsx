import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import supabase from "../../lib/supabaseClient";
import Sidebar from "../../components/admincomponents/AdminSidebar";
import { motion } from "framer-motion";
import { UserCircle } from "lucide-react";

const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (error || !sessionData.session) {
        navigate("/login");
        return;
      }

      const userId = sessionData.session.user.id;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profileError || !profile || profile.role !== "admin") {
        navigate("/unauthorized");
        return;
      }

      setSession(sessionData.session);
      setIsAdmin(true);
      setLoading(false);
    };

    checkAdminAccess();
  }, [navigate]);

  const isAtAdminRoot = location.pathname === "/admin";

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      {/* Changed from gradient to light gray */}
      <main className="flex-1 bg-white p-8 relative overflow-y-auto">
        <div className="flex justify-end items-center mb-8">
          <div className="flex items-center gap-3">
            <UserCircle className="w-10 h-10 text-blue-700" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>

        {isAtAdminRoot && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl font-extrabold text-blue-700 mb-4 leading-tight">
                Welcome Back, Admin!
              </h1>
              <p className="text-lg text-gray-600">
                Manage, monitor, and secure your system — all in one place.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Manage Users", desc: "Create and manage user accounts." },
                { title: "Monitor Activity", desc: "Track real-time updates and activity." },
                { title: "Customize Settings", desc: "Adjust system settings with ease." },
                { title: "Security & Access", desc: "Strengthen security permissions." },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
                >
                  <h2 className="text-2xl font-semibold text-blue-500 mb-2">{item.title}</h2>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-16"
            >
              <button className="bg-blue-600 hover:bg-blue-700 hover:shadow-lg text-white font-semibold px-8 py-3 rounded-full transition-all duration-300">
                Go to Dashboard
              </button>
            </motion.div>
          </>
        )}

        <Outlet />
      </main>
    </div>
  );
};

export default AdminPage;
