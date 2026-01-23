import TaskCard from "../Ui/TaskCard"; // <<-- KEEPING THIS PATH EXACTLY AS PROVIDED

export default function DashboardTab({ tasks, onToggleCompleted }) {
  const completedCount = tasks.filter((t) => t.submitted).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="p-8 bg-slate-50 min-h-full"> {/* Increased padding, consistent background with main content area */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-3 leading-tight">Your Dashboard</h1> {/* Larger, bolder title */}
      <p className="text-gray-600 mb-10 text-lg">Here's a snapshot of your child's progress and upcoming tasks.</p> {/* Larger, slightly darker sub-text */}

      {/* Progress Summary Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 mb-10 transition-all duration-300 hover:shadow-xl"> {/* More padding, larger rounded, stronger shadow, subtle blue border, hover effect */}
        <div className="flex justify-between items-center mb-3"> {/* Increased margin-bottom */}
          <h2 className="font-extrabold text-2xl text-blue-800">Weekly Progress</h2> {/* Bolder, larger, blue text */}
          <span className="font-extrabold text-3xl text-blue-600">{Math.round(progress)}%</span> {/* Larger, bolder, blue percentage */}
        </div>
        <div className="w-full bg-blue-100 rounded-full h-3"> {/* Progress bar track: lighter blue, slightly thicker */}
          <div
            className="bg-blue-500 h-3 rounded-full shadow-md" // Progress bar fill: vibrant blue, matching current theme, subtle shadow
            style={{ width: `${progress}%`, transition: "width 0.6s ease-in-out" }} // Slightly longer transition
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-4"> {/* Increased top margin, slightly darker text */}
          You've completed <span className="font-semibold text-blue-700">{completedCount}</span> of <span className="font-semibold text-blue-700">{totalCount}</span> tasks. Keep up the great work!
        </p>
      </div>

      {/* Tasks Grid */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl shadow-md border border-blue-100 text-gray-500">
            <h3 className="text-xl font-semibold mb-2">No tasks assigned yet!</h3>
            <p className="text-md">Your therapist will assign tasks soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"> {/* Responsive grid layout */}
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onToggleCompleted={onToggleCompleted} />
          ))}
        </div>
      )}
    </div>
  );
}