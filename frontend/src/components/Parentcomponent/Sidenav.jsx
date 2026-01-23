import { LayoutDashboard, MessageSquare, LogOut, Phone, Video, BookOpen } from "lucide-react";

export default function SideNav({ child, therapist, activeTab, setActiveTab }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "chat", label: "Chat", icon: MessageSquare },
    // --- THIS LINE HAS BEEN UPDATED ---
    { id: "supporting-material", label: "Supporting Materials", icon: BookOpen },
    // -----------------------------------
  ];

  if (!child) return null;

  return (
    <aside className="w-72 h-screen flex flex-col bg-[#DBEAFE] text-blue-900 p-6 sticky top-0 flex-shrink-0 shadow-xl">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-full bg-blue-300 text-blue-800 flex items-center justify-center text-3xl font-bold border-2 border-blue-400 shrink-0">
          {child.full_name?.charAt(0) || "?"}
        </div>
        <div>
          <p className="text-xl font-semibold">{child.full_name}</p>
          <p className="text-blue-700 text-sm">Child Profile</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="text-blue-700 uppercase text-xs font-bold tracking-wider mb-4">
          Menu
        </p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-lg transition-all duration-200 group ${
              activeTab === item.id
                ? "bg-blue-200 font-semibold shadow-sm border-l-4 border-blue-500 text-blue-900"
                : "hover:bg-blue-100 text-blue-800"
            }`}
          >
            <item.icon size={22} className="group-hover:scale-105 transition-transform duration-200" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="border-t border-blue-200 pt-6 mt-6">
        <p className="text-blue-700 uppercase text-xs font-bold tracking-wider mb-3">
          Your Therapist
        </p>
        <p className="font-semibold">{therapist.name}</p>
        <p className="text-sm text-blue-700 mb-4">{therapist.title}</p>
        <div className="flex gap-2">
          <button
            className="w-10 h-10 flex-1 bg-blue-600 hover:bg-blue-700 p-2 rounded-full text-white flex justify-center items-center transition-colors shadow-md"
            title="Voice Call"
          >
            <Phone size={18} />
          </button>
          <button
            className="w-10 h-10 flex-1 bg-blue-600 hover:bg-blue-700 p-2 rounded-full text-white flex justify-center items-center transition-colors shadow-md"
            title="Video Call"
          >
            <Video size={18} />
          </button>
        </div>
      </div>

      <button className="w-full flex items-center gap-3 px-4 py-3 mt-8 rounded-lg text-left text-blue-700 hover:bg-red-500/30 hover:text-red-700 transition-colors duration-200 group">
        <LogOut size={22} className="group-hover:scale-105 transition-transform duration-200" />
        <span className="font-medium">Log Out</span>
      </button>
    </aside>
  );
}