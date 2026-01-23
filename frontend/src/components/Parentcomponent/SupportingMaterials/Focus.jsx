// src/components/Parentcomponent/SupportingMaterials/FocusOnThingsPage.jsx
import { ArrowLeft, Brain, Eye, Target } from 'lucide-react';

export default function FocusOnThingsPage({ onBack }) {
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
            <Eye size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">Focus & Attention Skills</h1>
        </div>
        <p className="text-gray-600 mb-8 text-lg">
          Strategies to help your child improve concentration and stay engaged in tasks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Creating a Conducive Environment */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <Brain size={24} /> Optimal Learning Environment
            </h2>
            <p className="text-gray-700 mb-4">
              Setting up their space to minimize distractions and support focus.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Designate a quiet, clutter-free area for homework/activities.</li>
              <li>Minimize background noise (TV, loud music).</li>
              <li>Ensure good lighting and comfortable seating.</li>
              <li>Remove unnecessary toys or gadgets from the workspace.</li>
            </ul>
          </div>

          {/* Section 2: Engagement Strategies */}
          <div className="bg-pink-50 p-6 rounded-xl shadow-md border border-pink-200">
            <h2 className="text-2xl font-bold text-pink-800 mb-4 flex items-center gap-2">
              <Target size={24} /> Keeping Them Engaged
            </h2>
            <p className="text-gray-700 mb-4">
              Techniques to maintain attention and encourage task completion.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Break down long tasks into shorter segments with breaks.</li>
              <li>Use timers (e.g., "Work for 10 minutes, then break").</li>
              <li>Incorporate movement breaks.</li>
              <li>Use hands-on activities and visual aids.</li>
              <li>Provide clear, concise instructions one at a time.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 p-6 rounded-xl border border-yellow-200 shadow-md">
          <h3 className="text-xl font-bold text-yellow-800 mb-3">💡 Tip: Gamify Focus</h3>
          <p className="text-gray-700">
            Turn focus exercises into games. For instance, "Find the Difference" pictures or memory games can be fun ways to train attention.
          </p>
        </div>

      </div>
    </div>
  );
}