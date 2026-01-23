// src/components/therapist/TherapistSideNav.jsx
import { UserPlus, LogOut } from "lucide-react";

export default function TherapistSideNav({ students, selectedStudent, onSelectStudent }) {
  return (
    <aside className="w-80 h-screen flex flex-col bg-[#DBEAFE] text-blue-900 p-6 fixed shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <p className="text-blue-700 uppercase text-xs font-bold tracking-wider">Your Students</p>
        <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200" title="Add New Student">
          <UserPlus size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto -mr-4 pr-4">
        {students.length === 0 && (
          // FIX: Corrected comment syntax for JSX content
          <p className="text-blue-500 text-sm italic text-center py-4">No students found.{/* Adjusted text color */}</p>
        )}
        {students.map((student) => (
          <div
            key={student.id}
            onClick={() => onSelectStudent(student)}
            className={`w-full flex items-center gap-4 p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedStudent?.id === student.id
                ? "bg-blue-200 font-semibold shadow-md border-l-4 border-blue-500 text-blue-900"
                : "hover:bg-blue-100 text-blue-800"
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 border-2 ${selectedStudent?.id === student.id ? "bg-white text-blue-800 border-blue-400" : "bg-blue-300 text-blue-800 border-blue-400"}`}>
              {student.full_name?.charAt(0) || "?"}
            </div>
            <div>
              <p className="text-base">{student.full_name}</p>
              <p className={`text-sm ${selectedStudent?.id === student.id ? "text-blue-700" : "text-blue-600"}`}>
                {student.diagnosis_summary || "No Diagnosis"}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full flex items-center gap-3 px-4 py-3 mt-6 rounded-lg text-left text-blue-600 hover:bg-red-500/30 hover:text-red-700 transition-colors duration-200 group">
        <LogOut size={22} className="group-hover:scale-105 transition-transform duration-200" />
        <span className="font-medium">Log Out</span>
      </button>
    </aside>
  );
}