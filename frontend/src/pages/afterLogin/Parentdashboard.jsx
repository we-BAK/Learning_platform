import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Link } from "react-router-dom"; // For client-side routing
import supabase from "@/lib/supabaseClient";

// Component imports
import SideNav from "../../components/Parentcomponent/Sidenav";
import DashboardTab from "../../components/Parentcomponent/Dashboardtab";
import ChatTab from "../../components/Parentcomponent/ChatTab";
import SupportingMaterialsTab from "../../components/Parentcomponent/Supportingmaterial";

import logo from "../../assets/favs/logo.png"
export default function ParentPortalLumina() {
  const session = useSession();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [child, setChild] = useState(null);
  const [therapist, setTherapist] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    if (!session) {
      setChild(null);
      setTherapist(null);
      setTasks([]);
      setChatMessages([]);
      return;
    }

    async function loadChildAndData() {
      const { data: childData, error: childError } = await supabase
        .from("children")
        .select("*")
        .eq("parent_id", session.user.id)
        .single();

      if (childError || !childData) {
        console.error("Error fetching child:", childError);
        return;
      }

      setChild(childData);

      // Therapist info
      let therapistProfile = null;
      let therapistDetails = null;

      if (childData.therapist_id) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", childData.therapist_id)
          .single();

        if (!profileError) therapistProfile = profileData;

        const { data: detailsData, error: detailsError } = await supabase
          .from("therapist_details")
          .select("area_of_specialization")
          .eq("id", childData.therapist_id)
          .single();

        if (!detailsError) therapistDetails = detailsData;
      }

      if (therapistProfile || therapistDetails) {
        setTherapist({
          name: therapistProfile?.full_name || "Unknown",
          title: therapistDetails?.area_of_specialization || "Therapist",
        });
      } else {
        setTherapist({ name: "Not Assigned", title: "No Therapist" });
      }

      // Fetch tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from("tasks")
        .select("*")
        .eq("child_id", childData.id)
        .order("created_at", { ascending: true });

      if (!tasksError) setTasks(tasksData);

      // Fetch chat messages
      const { data: messagesData, error: messagesError } = await supabase
        .from("messages")
        .select("*")
        .eq("child_id", childData.id)
        .order("sent_at", { ascending: true });

      if (!messagesError) setChatMessages(messagesData);
    }

    loadChildAndData();
  }, [session]);

  const handleToggleCompleted = async (taskId, newStatus) => {
    const { error } = await supabase
      .from("tasks")
      .update({ submitted: newStatus })
      .eq("id", taskId);

    if (!error) {
      setTasks((prev) =>
        prev
          .map((task) =>
            task.id === taskId ? { ...task, submitted: newStatus } : task
          )
          .sort((a, b) => a.submitted - b.submitted)
      );
    } else {
      console.error("Error updating task:", error);
    }
  };

  const handleSendMessage = async (text) => {
    if (!child) return;

    const newMessage = {
      child_id: child.id,
      sender: "parent",
      text,
      sent_at: new Date().toISOString(),
    };

    // Optimistic update
    const tempId = Math.random();
    setChatMessages((prev) => [...prev, { ...newMessage, id: tempId }]);

    const { data, error } = await supabase
      .from("messages")
      .insert([newMessage])
      .select();

    if (error) {
      console.error("Error sending message:", error);
      // Rollback optimistic update
      setChatMessages((prev) => prev.filter((msg) => msg.id !== tempId));
    } else if (data && data.length > 0) {
      // Replace temp with actual
      setChatMessages((prev) =>
        prev.map((msg) => (msg.id === tempId ? data[0] : msg))
      );
    }
  };

  if (!session)
    return (
      <p className="flex items-center justify-center h-screen bg-slate-50 text-gray-700 text-xl">
        Please log in to see your data.
      </p>
    );

  if (!child || !therapist)
    return (
      <p className="flex items-center justify-center h-screen bg-slate-50 text-gray-700 text-xl">
        Loading your dashboard...
      </p>
    );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 flex items-center px-8 py-4 bg-white shadow-md">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={logo} 
            alt="BrightBridge Logo"
            className="h-10 w-auto"
          />
          <span className="text-2xl font-bold text-blue-700 select-none">
            BrightBridge
          </span>
        </Link>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        <SideNav
          child={child}
          therapist={therapist}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <main className="flex-1 p-8 overflow-y-auto">
          {activeTab === "dashboard" && (
            <DashboardTab tasks={tasks} onToggleCompleted={handleToggleCompleted} />
          )}
          {activeTab === "chat" && (
            <ChatTab
              messages={chatMessages}
              onSend={handleSendMessage}
              therapist={therapist}
            />
          )}
          {activeTab === "supporting-material" && (
            <SupportingMaterialsTab childId={child.id} />
          )}
        </main>
      </div>
    </div>
  );
}
