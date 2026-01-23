// src/components/Parentcomponent/SupportingMaterials/CommunicationPage.jsx
import { ArrowLeft, MessageCircle, Volume2, Users } from 'lucide-react';

export default function CommunicationPage({ onBack }) {
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
            <MessageCircle size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">Communication Skills</h1>
        </div>
        <p className="text-gray-600 mb-8 text-lg">
          Enhancing your child's ability to express themselves and understand others, both verbally and non-verbally.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Expressive Communication */}
          <div className="bg-yellow-50 p-6 rounded-xl shadow-md border border-yellow-200">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
              <Volume2 size={24} /> Expressing Needs & Ideas
            </h2>
            <p className="text-gray-700 mb-4">
              Helping your child use words, gestures, or pictures to share thoughts.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Encourage "I want" or "I feel" statements.</li>
              <li>Use visuals (picture cards) for choices or daily activities.</li>
              <li>Practice asking "wh-" questions (who, what, where).</li>
              <li>Read aloud and discuss the story, encouraging them to retell parts.</li>
            </ul>
          </div>

          {/* Section 2: Receptive Communication */}
          <div className="bg-green-50 p-6 rounded-xl shadow-md border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <Users size={24} /> Understanding Others
            </h2>
            <p className="text-gray-700 mb-4">
              Improving their ability to follow instructions and comprehend language.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Give one-step, then two-step instructions.</li>
              <li>Play games like "Simon Says" to practice following directions.</li>
              <li>Ask them to point to objects you name.</li>
              <li>Reduce distractions when giving important information.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-md">
          <h3 className="text-xl font-bold text-blue-800 mb-3">💡 Tip: Listen Actively</h3>
          <p className="text-gray-700">
            When your child communicates, give them your full attention. Get down to their level, make eye contact, and respond genuinely to show them their words matter.
          </p>
        </div>

      </div>
    </div>
  );
}