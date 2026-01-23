// src/components/therapist/TaskProgressTab.jsx
import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";
import { CheckCircle, XCircle } from "lucide-react";

export default function TaskProgressTab({ studentId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    const { data, error: supabaseError } = await supabase
      .from("tasks")
      .select("*")
      .eq("child_id", studentId)
      .order("created_at", { ascending: false });

    setLoading(false);
    if (supabaseError) {
      console.error("Error fetching tasks:", supabaseError.message);
      setError("Failed to load tasks.");
    } else {
      setTasks(data || []);
    }
  };

  const toggleSubmission = async (task) => {
    const newSubmittedStatus = !task.submitted;
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === task.id ? { ...t, submitted: newSubmittedStatus } : t
      )
    );
    const { error: updateError } = await supabase
      .from("tasks")
      .update({ submitted: newSubmittedStatus })
      .eq("id", task.id);

    if (updateError) {
      console.error("Error updating task submission:", updateError.message);
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === task.id ? { ...t, submitted: task.submitted } : t
        )
      );
      setError("Failed to update task status.");
    } else {
      fetchTasks();
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [studentId]);

  return (
    <div className="p-8 bg-white h-full overflow-y-auto shadow-inner rounded-lg">
      <h2 className="text-2xl font-extrabold text-gray-800 border-b pb-4 mb-6">Task Progress</h2>

      {loading && <p className="text-center text-gray-500 py-4">Loading tasks...</p>}
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
      {!loading && !error && tasks.length === 0 && (
        <p className="text-center text-gray-500 py-4 italic">No tasks assigned for this student yet.</p>
      )}

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border border-gray-200 p-5 rounded-xl shadow-md bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-200 hover:shadow-lg"
          >
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{task.title}</h3>
              <p className="text-sm text-slate-600 mb-2">{task.notes || "No additional notes."}</p>
              <p className="text-sm text-slate-500">
                <span className="font-semibold">Frequency:</span> {task.days_per_week} days/week, {task.hours_per_day} hours/day
              </p>
              <p className="text-sm text-slate-500 mt-1">
                <span className="font-semibold">Assigned On:</span> {new Date(task.created_at).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => toggleSubmission(task)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md
                ${task.submitted ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-green-600 hover:bg-green-700 text-white"}
              `}
            >
              {task.submitted ? <XCircle size={18} /> : <CheckCircle size={18} />}
              <span>{task.submitted ? "Mark as Pending" : "Mark as Submitted"}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}