
import {
  LayoutDashboard,
  MessageSquare,
  LogOut,
  Phone,
  Video,
  BookOpen,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import supabase from "@/lib/supabaseClient";

export default function SideNav({
  child,
  therapist,
  activeTab,
  setActiveTab,
}) {
  const navigate = useNavigate();

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "chat",
      label: "Chat",
      icon: MessageSquare,
    },
    {
      id: "supporting-material",
      label: "Supporting Materials",
      icon: BookOpen,
    },
  ];

  if (!child) return null;

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-72 h-dvh flex flex-col bg-[#DBEAFE] text-blue-900 p-6 sticky top-0 shrink-0 shadow-xl overflow-hidden">

      {/* Child Profile */}
      <div className="flex items-center gap-4 mb-8 shrink-0">
        <div className="w-16 h-16 rounded-full bg-blue-300 text-blue-800 flex items-center justify-center text-3xl font-bold border-2 border-blue-400 shrink-0">
          {child.full_name?.charAt(0) || "?"}
        </div>

        <div className="min-w-0">
          <p className="text-xl font-semibold truncate">
            {child.full_name}
          </p>
          <p className="text-blue-700 text-sm">
            Child Profile
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 min-h-0 overflow-y-auto space-y-2 custom-scrollbar">
        <p className="text-blue-700 uppercase text-xs font-bold tracking-wider mb-4">
          Menu
        </p>

        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-lg transition-all duration-200 group ${
              activeTab === item.id
                ? "bg-blue-200 font-semibold shadow-sm border-l-4 border-blue-500 text-blue-900"
                : "hover:bg-blue-100 text-blue-800"
            }`}
          >
            <item.icon
              size={22}
              className="group-hover:scale-105 transition-transform duration-200"
            />

            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Therapist Information */}
      <div className="border-t border-blue-200 pt-5 mt-5 shrink-0">
        <p className="text-blue-700 uppercase text-xs font-bold tracking-wider mb-3">
          Your Therapist
        </p>

        {therapist ? (
          <>
            <p className="font-semibold truncate">
              {therapist.name || "Therapist"}
            </p>

            <p className="text-sm text-blue-700 mb-4 truncate">
              {therapist.title || "Assigned Therapist"}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 p-2 rounded-full text-white flex justify-center items-center transition-colors shadow-md"
                title="Voice Call"
              >
                <Phone size={18} />
              </button>

              <button
                type="button"
                className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 p-2 rounded-full text-white flex justify-center items-center transition-colors shadow-md"
                title="Video Call"
              >
                <Video size={18} />
              </button>
            </div>
          </>
        ) : (
          <p className="text-sm text-blue-600">
            No therapist assigned.
          </p>
        )}
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 mt-5 rounded-lg text-left text-blue-700 hover:bg-red-100 hover:text-red-700 transition-colors duration-200 group shrink-0 border-t border-blue-200"
      >
        <LogOut
          size={22}
          className="group-hover:scale-105 transition-transform duration-200"
        />

        <span className="font-medium">
          Log Out
        </span>
      </button>

    </aside>
  );
}
