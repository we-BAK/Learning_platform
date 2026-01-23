import React, { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  ShieldCheck,
  Database,
} from "lucide-react";
import  supabase  from "../../lib/supabaseClient"; 

const DashboardContent = () => {
  const [userCounts, setUserCounts] = useState({
    total: 0,
    therapists: 0,
    managers: 0,
    parents: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const { data: allUsers, error } = await supabase
        .from("profiles")
        .select("role");

      if (error) {
        console.error("Failed to fetch profiles:", error.message);
        return;
      }

      const counts = {
        total: allUsers.length,
        therapists: allUsers.filter((u) => u.role === "therapist").length,
        managers: allUsers.filter((u) => u.role === "manager").length,
        parents: allUsers.filter((u) => u.role === "parent").length,
      };

      setUserCounts(counts);
    };

    fetchCounts();
  }, []);

  const stats = [
    {
      title: "Total Users",
      count: userCounts.total,
      icon: <Users className="text-indigo-600" size={28} />,
      bgColor: "bg-indigo-50",
    },
    {
      title: "Total Therapists",
      count: userCounts.therapists,
      icon: <UserCheck className="text-blue-600" size={28} />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Managers",
      count: userCounts.managers,
      icon: <ShieldCheck className="text-green-600" size={28} />,
      bgColor: "bg-green-50",
    },
    {
      title: "Total Parents",
      count: userCounts.parents,
      icon: <UserPlus className="text-yellow-600" size={28} />,
      bgColor: "bg-yellow-50",
    },
  ];

  // Static backup info for now
  const lastBackup = {
    date: "2025-05-19",
    time: "10:30 AM",
    status: "success", // or "failed"
  };

  const statusColor =
    lastBackup.status === "success" ? "bg-green-500" : "bg-red-500";
  const statusText = lastBackup.status === "success" ? "Success" : "Failed";

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Admin Dashboard Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-2xl p-5 ${stat.bgColor} shadow-md flex items-center space-x-4`}
          >
            <div className="p-3 bg-white rounded-full shadow">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Last Backup */}
      <div className="rounded-2xl p-5 bg-white shadow-md flex items-center space-x-4">
        <div className="p-3 bg-gray-100 rounded-full shadow">
          <Database className="text-gray-700" size={28} />
        </div>
        <div>
          <p className="text-sm text-gray-600">Last Backup</p>
          <p className="text-gray-800">
            {lastBackup.date} at {lastBackup.time}
          </p>
          <span
            className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium text-white rounded-full ${statusColor}`}
          >
            {statusText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
