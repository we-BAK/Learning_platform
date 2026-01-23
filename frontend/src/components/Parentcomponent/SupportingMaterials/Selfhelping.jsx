// src/components/Parentcomponent/SupportingMaterials/SelfHelpingPage.jsx
import { ArrowLeft, Lightbulb, CheckSquare, Sparkles } from 'lucide-react';

export default function SelfHelpingPage({ onBack }) {
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
            <Sparkles size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">Self-Helping Skills</h1>
        </div>
        <p className="text-gray-600 mb-8 text-lg">
          Empowering your child to become more independent and capable in their daily life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Daily Routines */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <CheckSquare size={24} /> Mastering Daily Routines
            </h2>
            <p className="text-gray-700 mb-4">
              Encouraging independence in tasks like dressing, eating, and hygiene.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Use visual schedules for morning and bedtime routines.</li>
              <li>Break down complex tasks into smaller, manageable steps.</li>
              <li>Praise effort and small successes consistently.</li>
              <li>Allow choices (e.g., "Do you want to wear the blue shirt or the red one?").</li>
            </ul>
          </div>

          {/* Section 2: Problem-Solving Basics */}
          <div className="bg-green-50 p-6 rounded-xl shadow-md border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <Lightbulb size={24} /> Basic Problem-Solving
            </h2>
            <p className="text-gray-700 mb-4">
              Helping your child think through challenges on their own.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Ask open-ended questions: "What could you do?" or "What's the next step?".</li>
              <li>Practice simple scenarios: "What if your toy car gets stuck?"</li>
              <li>Teach them to ask for help when truly stuck, not at the first hurdle.</li>
              <li>Encourage trial and error; mistakes are part of learning.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 p-6 rounded-xl border border-yellow-200 shadow-md">
          <h3 className="text-xl font-bold text-yellow-800 mb-3">💡 Tip: Encourage Responsibility</h3>
          <p className="text-gray-700">
            Assign age-appropriate chores or responsibilities. This builds confidence and a sense of contribution. Even putting away one toy is a start!
          </p>
        </div>

      </div>
    </div>
  );
}