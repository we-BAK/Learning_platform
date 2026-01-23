// src/components/therapist/AssignTaskTab.jsx
import { useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function AssignTaskTab({ studentId, onAssigned }) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [days, setDays] = useState(3);
  const [hours, setHours] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const assignTask = async () => {
    if (!title || !studentId) {
      setError("Task title is required.");
      return;
    }
    setLoading(true);
    setError(null);
    const { error: supabaseError } = await supabase.from("tasks").insert({
      child_id: studentId,
      title,
      notes,
      days_per_week: days,
      hours_per_day: hours,
    });

    setLoading(false);
    if (supabaseError) {
      console.error("Error assigning task:", supabaseError.message);
      setError("Failed to assign task. Please try again.");
    } else {
      onAssigned();
      setTitle("");
      setNotes("");
      setDays(3);
      setHours(1);
      alert("Task assigned successfully!");
    }
  };

  const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="p-8 space-y-6 bg-white h-full overflow-y-auto shadow-inner rounded-lg">
      <h2 className="text-2xl font-extrabold text-gray-800 border-b pb-4 mb-4">Assign New Task</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}

      <div>
        <label htmlFor="task-title" className={labelClasses}>Task Title <span className="text-red-500">*</span></label>
        <input
          id="task-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Daily Reading Practice"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="task-notes" className={labelClasses}>Notes (optional)</label>
        <textarea
          id="task-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Detailed instructions or specific goals for the task."
          rows="4"
          className={inputClasses}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="days-per-week" className={labelClasses}>Days per Week</label>
          <input
            id="days-per-week"
            type="number"
            value={days}
            onChange={(e) => setDays(Math.max(1, +e.target.value))}
            min="1"
            max="7"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="hours-per-day" className={labelClasses}>Hours per Day</label>
          <input
            id="hours-per-day"
            type="number"
            value={hours}
            onChange={(e) => setHours(Math.max(0, +e.target.value))}
            min="0"
            step="0.5"
            className={inputClasses}
          />
        </div>
      </div>
      <button
        onClick={assignTask}
        className={`w-full bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={loading}
      >
        {loading ? "Assigning..." : "Assign Task"}
      </button>
    </div>
  );
}