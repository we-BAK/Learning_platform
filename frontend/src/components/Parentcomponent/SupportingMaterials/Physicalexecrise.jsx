// src/components/Parentcomponent/SupportingMaterials/PhysicalExercisePage.jsx
import { ArrowLeft, Dumbbell, Footprints, Bike } from 'lucide-react'; // Changed 'Run' to 'Footprints'

export default function PhysicalExercisePage({ onBack }) {
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
            <Dumbbell size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">Physical Exercise & Motor Skills</h1>
        </div>
        <p className="text-gray-600 mb-8 text-lg">
          Encouraging active play and structured exercises to develop gross and fine motor skills, coordination, and overall physical well-being.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Gross Motor Skills */}
          <div className="bg-cyan-50 p-6 rounded-xl shadow-md border border-cyan-200">
            <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
              <Footprints size={24} /> {/* Changed icon to Footprints */} Developing Gross Motor Skills
            </h2>
            <p className="text-gray-700 mb-4">
              Activities that use large muscle groups for movement and coordination.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Running, jumping, and hopping games.</li>
              <li>Throwing and catching balls of various sizes.</li>
              <li>Bouncing on a trampoline or large exercise ball.</li>
              <li>Playing tag, follow-the-leader, or obstacle courses.</li>
              <li>Dancing to music.</li>
            </ul>
          </div>

          {/* Section 2: Fine Motor Skills */}
          <div className="bg-fuchsia-50 p-6 rounded-xl shadow-md border border-fuchsia-200">
            <h2 className="text-2xl font-bold text-fuchsia-800 mb-4 flex items-center gap-2">
              <Bike size={24} /> Enhancing Fine Motor Skills
            </h2>
            <p className="text-gray-700 mb-4">
              Activities that involve small muscle movements, especially in the hands and fingers.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Building with small blocks or LEGOs.</li>
              <li>Using scissors to cut shapes.</li>
              <li>Drawing, coloring, and tracing.</li>
              <li>Buttoning clothes, zipping zippers, tying shoelaces.</li>
              <li>Playing with puzzles that have small pieces.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-md">
          <h3 className="text-xl font-bold text-blue-800 mb-3">💡 Tip: Make it Play!</h3>
          <p className="text-gray-700">
            Children learn best through play. Incorporate these exercises into fun games and activities rather than structured "workouts" to keep them engaged and motivated.
          </p>
        </div>

      </div>
    </div>
  );
}