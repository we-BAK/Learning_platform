import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import TherapistSideNav from "../../components/Therapistcomponent/Therapistsidenav"; 
import ContentHeader from "../../components/Therapistcomponent/ContentHeader"; 
import ChatTab from "../../components/Therapistcomponent/ChatTab";
import AssignTaskTab from "../../components/Therapistcomponent/AssignTaskTab"; 
import TaskProgressTab from "../../components/Therapistcomponent/TaskProgressTab";
import { ClipboardList, ClipboardCheck, MessageSquare, Loader2 } from "lucide-react";

export default function TherapistDashboard() {
  const session = useSession();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");
  const [loadingStudents, setLoadingStudents] = useState(true);

  const fetchStudents = async () => {
    if (!session?.user?.id) return;
    
    setLoadingStudents(true);
    const { data, error } = await supabase
      .from("children")
      .select("id, full_name, age, diagnosis_summary")
      .eq("therapist_id", session.user.id);
    
    setLoadingStudents(false);

    if (error) {
      console.error("Error fetching students:", error.message);
      return;
    }

    setStudents(data || []);
    
    // Auto-select first student if none selected
    if (data && data.length > 0 && !selectedStudent) {
      setSelectedStudent(data[0]);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [session?.user?.id]);

  const renderTab = () => {
    // SECURITY CHECK: Ensure we have a valid UUID before rendering the tab
    if (!selectedStudent || !selectedStudent.id) {
        return (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-lg">
                Please select a student from the sidebar.
            </div>
        );
    }

    // Use 'key' to force the component to re-mount when student changes
    // This prevents sending messages to the 'previous' student by mistake
    switch (activeTab) {
      case "chat":
        return <ChatTab key={selectedStudent.id} studentId={selectedStudent.id} />;
      case "assign":
        return <AssignTaskTab key={selectedStudent.id} studentId={selectedStudent.id} onAssigned={fetchStudents} />;
      case "progress":
        return <TaskProgressTab key={selectedStudent.id} studentId={selectedStudent.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <TherapistSideNav
        students={students}
        selectedStudent={selectedStudent}
        onSelectStudent={(s) => {
          setSelectedStudent(s);
          setActiveTab("chat"); // Reset to chat when switching students
        }}
      />
      <main className="ml-80 flex-1 flex flex-col overflow-hidden">
        {loadingStudents ? (
          <div className="flex-1 flex flex-col items-center justify-center text-blue-600">
            <Loader2 size={48} className="animate-spin mb-4" />
            <p className="text-xl font-medium">Loading your students...</p>
          </div>
        ) : selectedStudent ? (
            <>
              <ContentHeader student={selectedStudent} />
              <nav className="flex gap-2 p-3 border-b border-gray-200 bg-white shadow-sm sticky top-0 z-10">
                {[
                  { id: "chat", label: "Chat", icon: MessageSquare },
                  { id: "assign", label: "Assign Task", icon: ClipboardList },
                  { id: "progress", label: "Progress", icon: ClipboardCheck },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex gap-2 items-center px-4 py-2 rounded-lg font-semibold transition-all duration-200
                      ${activeTab === tab.id
                        ? "bg-blue-100 text-blue-700 shadow-sm"
                        : "hover:bg-gray-100 text-gray-600"
                      }
                    `}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
              </nav>
              <div className="flex-1 min-h-0 p-4 bg-gray-50 overflow-y-auto">
                  {renderTab()}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-xl font-medium">
              No students assigned to you yet.
            </div>
          )
        }
      </main>
    </div>
  );
}