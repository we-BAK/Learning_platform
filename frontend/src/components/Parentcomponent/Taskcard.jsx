import { CheckCircle2, Hourglass } from "lucide-react";

export default function TaskCard({ task, onToggleCompleted }) {
  return (
    <div
      className={`bg-white p-5 rounded-xl shadow-sm border-l-4 transition-all hover:shadow-md ${
        task.submitted ? "border-green-500" : "border-amber-500"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-slate-800">{task.title}</h3>
          <p className="text-sm text-slate-500 mt-1">
            Goal: {task.days_per_week} days/week, {task.hours_per_day}h/day
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            task.submitted ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
          }`}
        >
          {task.submitted ? <CheckCircle2 size={14} /> : <Hourglass size={14} />}
          {task.submitted ? "Completed" : "To-Do"}
        </span>
      </div>
      {task.notes && (
        <p className="mt-3 text-sm text-slate-600 bg-slate-100 p-3 rounded-lg italic">
          "{task.notes}"
        </p>
      )}
      <div className="mt-4 text-right">
        <button
          onClick={() => onToggleCompleted(task.id, !task.submitted)}
          className={`px-5 py-2 rounded-lg text-sm font-semibold text-white transition-transform active:scale-95 ${
            task.submitted ? "bg-amber-500 hover:bg-amber-600" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {task.submitted ? "Mark as To-Do" : "Mark as Complete"}
        </button>
      </div>
    </div>
  );
}
