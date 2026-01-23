import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  User,
  ShieldCheck,
  Power,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "../../components/Ui/Button";
import { ScrollArea } from "../../components/Ui/ScrollArea";
import supabase from "../../lib/supabaseClient";

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [adminProfile, setAdminProfile] = useState({ name: "", role: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Example: Fetch from Supabase
    const fetchProfile = async () => {
      // Replace with your logic to get the current admin's ID
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Adjust table/field names as needed
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setAdminProfile({
          name: data.full_name || "Admin",
          role: data.role || "Administrator",
        });
      }
    };

    fetchProfile();
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div
      className={`h-screen bg-blue-50 text-black flex flex-col shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-blue-200">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-black hover:bg-blue-100"
        >
          {isCollapsed ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
        </Button>
        {!isCollapsed && <span className="text-lg font-bold">Admin</span>}
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center gap-2 px-4 py-6 border-b border-blue-200">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 border-2 border-blue-300">
          <User className="w-8 h-8 text-black" />
        </div>
        {!isCollapsed && (
          <>
            <h3 className="text-md font-semibold mt-2">
              {adminProfile.name || "Admin"}
            </h3>
            <p className="text-xs text-gray-600">
              {adminProfile.role || "Administrator"}
            </p>
          </>
        )}
      </div>

      {/* Navigation Links */}
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-4">
          <SidebarLink
            to="/admin/dashboard"
            icon={<ShieldCheck />}
            label="Dashboard"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/admin/manage-users"
            icon={<User />}
            label="Manage Users"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/admin/access-control"
            icon={<Power />}
            label="Access Control"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            to="/admin/setting"
            icon={<Settings />}
            label="Settings"
            isCollapsed={isCollapsed}
          />
        </nav>
      </ScrollArea>

      {/* Logout */}
      <div className="p-4 border-t border-blue-200">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2 text-black hover:bg-blue-100"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </div>
  );
};

// Reusable Sidebar Link
function SidebarLink({ to, icon, label, isCollapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-2 py-2 rounded-md transition-colors ${
          isActive
            ? "bg-blue-200 font-semibold"
            : "hover:bg-blue-100"
        } text-black`
      }
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
}

export default AdminSidebar;
