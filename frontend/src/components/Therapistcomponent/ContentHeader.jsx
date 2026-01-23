// src/components/therapist/ContentHeader.jsx
import { Phone, Video } from "lucide-react";

export default function ContentHeader({ student }) {
  return (
    <header className="p-6 border-b border-slate-200 bg-white flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-3xl font-bold border-2 border-blue-200 shrink-0">
          {student.full_name?.charAt(0) || "?"}
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 leading-tight">{student.full_name}</h1>
          <p className="text-slate-500 text-sm mt-1">Age: <span className="font-semibold">{student.age}</span> | Diagnosis: <span className="font-semibold">{student.diagnosis_summary || "N/A"}</span></p>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300" title="Voice Call">
          <Phone size={24} />
        </button>
        <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300" title="Video Call">
          <Video size={24} />
        </button>
      </div>
    </header>
  );
}