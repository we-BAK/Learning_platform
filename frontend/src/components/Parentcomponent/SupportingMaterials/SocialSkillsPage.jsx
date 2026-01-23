// src/components/Parentcomponent/SupportingMaterials/SocialSkillsPage.jsx
import { ArrowLeft, Smile, Handshake, Users } from 'lucide-react';

export default function SocialSkillsPage({ onBack }) {
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
            <Users size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">Social Skills Development</h1>
        </div>
        <p className="text-gray-600 mb-8 text-lg">
          Helping your child interact more effectively and comfortably with peers and adults.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Understanding Emotions */}
          <div className="bg-purple-50 p-6 rounded-xl shadow-md border border-purple-200">
            <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              <Smile size={24} /> Understanding Emotions
            </h2>
            <p className="text-gray-700 mb-4">
              Learning to identify and respond to their own feelings and others'.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Use emotion cards or books to name feelings (happy, sad, angry).</li>
              <li>Talk about characters' feelings in stories or shows.</li>
              <li>Model empathetic responses: "I see you're feeling frustrated, can I help?"</li>
              <li>Practice making different facial expressions in a mirror.</li>
            </ul>
          </div>

          {/* Section 2: Interacting with Others */}
          <div className="bg-teal-50 p-6 rounded-xl shadow-md border border-teal-200">
            <h2 className="text-2xl font-bold text-teal-800 mb-4 flex items-center gap-2">
              <Handshake size={24} /> Positive Interactions
            </h2>
            <p className="text-gray-700 mb-4">
              Tips for greetings, sharing, turn-taking, and resolving conflicts.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Role-play saying "hello" and "goodbye" with eye contact.</li>
              <li>Practice sharing toys and taking turns during play.</li>
              <li>Teach simple phrases for asking to join play or expressing needs.</li>
              <li>Encourage active listening by having them repeat what they heard.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-md">
          <h3 className="text-xl font-bold text-blue-800 mb-3">💡 Tip: Social Stories</h3>
          <p className="text-gray-700">
            Create simple social stories to prepare your child for new social situations or to practice appropriate behaviors in specific contexts (e.g., "Going to a Birthday Party").
          </p>
        </div>

      </div>
    </div>
  );
}