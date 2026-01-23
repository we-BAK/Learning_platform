// src/components/Parentcomponent/SupportingMaterials/HandwritingPage.jsx
import { ArrowLeft, Pencil, PenTool, Eraser } from 'lucide-react';

export default function HandwritingPage({ onBack }) {
  return (
    <div className="p-8 bg-slate-50 min-h-full">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 text-lg font-medium"
      >
        <ArrowLeft size={20} /> Back to Supporting Materials
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center shadow-inner shrink-0">
            <PenTool size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">Handwriting Skills</h1>
        </div>
        <p className="text-gray-600 mb-8 text-lg">
          Developing fine motor skills and letter formation for clear and comfortable writing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Pre-Writing Activities */}
          <div className="bg-purple-50 p-6 rounded-xl shadow-md border border-purple-200">
            <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              <Pencil size={24} /> Pre-Writing Fun
            </h2>
            <p className="text-gray-700 mb-4">
              Activities to strengthen hand muscles and prepare for writing.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Play with playdough: rolling, squeezing, cutting.</li>
              <li>Practice drawing lines and shapes (circles, squares, crosses).</li>
              <li>Use finger paints or shaving cream to draw on smooth surfaces.</li>
              <li>Thread beads or pick up small objects with tongs.</li>
            </ul>
          </div>

          {/* Section 2: Letter Formation */}
          <div className="bg-indigo-50 p-6 rounded-xl shadow-md border border-indigo-200">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
              <Eraser size={24} /> Perfecting Letter Formation
            </h2>
            <p className="text-gray-700 mb-4">
              Tips for proper grip, posture, and forming letters correctly.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Ensure proper sitting posture and paper position.</li>
              <li>Teach correct pencil grip (tripod grip) using grippers if needed.</li>
              <li>Practice tracing letters and then copying them.</li>
              <li>Use lined paper to guide letter size and alignment.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-md">
          <h3 className="text-xl font-bold text-blue-800 mb-3">💡 Tip: Make it Sensory!</h3>
          <p className="text-gray-700">
            Try writing letters in sand, salt, or rice. This adds a tactile element that can be very engaging and helpful for muscle memory.
          </p>
        </div>

      </div>
    </div>
  );
}