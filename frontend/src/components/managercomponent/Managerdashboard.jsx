// pages/manager/ManagerDashboardOverview.jsx

import { useEffect, useState } from "react";
import  supabase  from "../../lib/supabaseClient"; 
import { Users, UserCheck, UserPlus, Clock } from "lucide-react";

export default function ManagerDashboardOverview() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTherapists: 0,
    approvedParents: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total students from children table
        const { count: totalStudents } = await supabase
          .from("children")
          .select("*", { count: "exact", head: true });

        // Fetch total therapists from profiles table
        const { count: totalTherapists } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("role", "therapist");

        // Fetch approved parents from registrations
        const { count: approvedParents } = await supabase
          .from("registrations")
          .select("*", { count: "exact", head: true })
          .eq("request_status", "approved");

        // Fetch pending requests from registrations
        const { count: pendingRequests } = await supabase
          .from("registrations")
          .select("*", { count: "exact", head: true })
          .eq("request_status", "pending");

        setStats({
          totalStudents: totalStudents || 0,
          totalTherapists: totalTherapists || 0,
          approvedParents: approvedParents || 0,
          pendingRequests: pendingRequests || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error.message);
      }
    };

    fetchStats();
  }, []);

  const dashboardCards = [
    {
      title: "Total Students",
      count: stats.totalStudents,
      icon: <UserCheck className="text-blue-600" size={28} />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Therapists",
      count: stats.totalTherapists,
      icon: <Users className="text-green-600" size={28} />,
      bgColor: "bg-green-50",
    },
    {
      title: "Approved Parents",
      count: stats.approvedParents,
      icon: <UserPlus className="text-indigo-600" size={28} />,
      bgColor: "bg-indigo-50",
    },
    {
      title: "Pending Requests",
      count: stats.pendingRequests,
      icon: <Clock className="text-yellow-600" size={28} />,
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manager Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((stat, index) => (
          <div
            key={index}
            className={`rounded-2xl p-5 ${stat.bgColor} shadow-md flex items-center space-x-4`}
          >
            <div className="p-3 bg-white rounded-full shadow">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
