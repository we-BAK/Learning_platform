import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Link } from "react-router-dom";
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

  // --- 1. REALTIME SUBSCRIPTION ---
  useEffect(() => {
    // Only subscribe if we have a session AND a child loaded
    if (!session || !child?.id) return;

    const channel = supabase
      .channel(`chat-child-${child.id}`)
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `child_id=eq.${child.id}` // Server-side filtering is more efficient
        },
        (payload) => {
          setChatMessages((prev) => {
            // Prevent duplicate messages if Realtime and Insert happen at same time
            if (prev.find(m => m.id === payload.new.id)) return prev;
            return [...prev, payload.new];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session, child?.id]); // Depend on child.id specifically

  // --- 2. EXISTING DATA LOADING ---
  useEffect(() => {
    if (!session) {
      setChild(null);
      setTherapist(null);
      setTasks([]);
      setChatMessages([]);
      return;
    }

    async function loadChildAndData() {
      // Fetch Child
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

      // Fetch Therapist info logic
      if (childData.therapist_id) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", childData.therapist_id)
          .single();

        const { data: detailsData } = await supabase
          .from("therapist_details")
          .select("area_of_specialization")
          .eq("id", childData.therapist_id)
          .single();

        setTherapist({
          id: childData.therapist_id, // Added ID for logic reference
          name: profileData?.full_name || "Unknown",
          title: detailsData?.area_of_specialization || "Therapist",
        });
      } else {
        setTherapist({ name: "Not Assigned", title: "No Therapist" });
      }

      // Fetch tasks
      const { data: tasksData } = await supabase
        .from("tasks")
        .select("*")
        .eq("child_id", childData.id)
        .order("created_at", { ascending: true });

      if (tasksData) setTasks(tasksData);

      // Fetch initial chat messages (Using corrected column names)
      const { data: messagesData } = await supabase
        .from("messages")
        .select("*")
        .eq("child_id", childData.id)
        .order("created_at", { ascending: true });

      if (messagesData) setChatMessages(messagesData);
    }

    loadChildAndData();
  }, [session]);

  // --- 3. TASK UPDATE LOGIC ---
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

  // --- 4. CHAT SEND LOGIC ---
  const handleSendMessage = async (text) => {
    if (!child) return;

    const { error } = await supabase
      .from("messages")
      .insert([
        {
          child_id: child.id,
          sender_id: session.user.id,
          sender_type: "parent",
          message: text,
        }
      ]);

    if (error) {
      console.error("Error sending message:", error);
    }
    // Realtime listener handles the UI update
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
      <header className="sticky top-0 z-50 flex items-center px-8 py-4 bg-white shadow-md">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="BrightBridge Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold text-blue-700 select-none">
            BrightBridge
          </span>
        </Link>
      </header>

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