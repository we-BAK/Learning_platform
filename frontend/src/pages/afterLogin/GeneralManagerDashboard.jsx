// pages/manager/ManagerDashboard.jsx

import Sidebar from "../../components/sidebar/Sidebar";
import {
  Users,
  UserPlus,
  UserCheck,
  FileText,
  Calendar,
  Bell,
  Settings,
  LogOut, // Add this import
} from "lucide-react";
import { Outlet } from "react-router-dom";

const managerNavItems = [
  { label: "Dashboard Overview", icon: <Users size={20} />, path: "/manager/dashboard" },
  { label: "Parent Requests", icon: <UserPlus size={20} />, path: "/manager/requests" },
  { label: "Students", icon: <UserCheck size={20} />, path: "/manager/students" },
  { label: "Therapists", icon: <Users size={20} />, path: "/manager/therapists" },
  { label: "Reports", icon: <FileText size={20} />, path: "/manager/reports" },
  { label: "Schedule", icon: <Calendar size={20} />, path: "/manager/schedule" },
  { label: "Notifications", icon: <Bell size={20} />, path: "/manager/notifications" },
  { label: "Account Settings", icon: <Settings size={20} />, path: "/manager/account-settings" },
  { label: "Logout", icon: <LogOut size={20} />, path: "/manager/logout" }, // Add logout item
];

export default function GeneralManagerDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <Sidebar title="Manager Panel" navItems={managerNavItems} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto bg-white rounded-tl-3xl shadow-md">
        <Outlet />
      </main>
    </div>
  );
}
