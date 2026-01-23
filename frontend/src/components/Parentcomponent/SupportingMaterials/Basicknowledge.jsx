// src/components/Parentcomponent/SupportingMaterials/BasicKnowledgePage.jsx
import { ArrowLeft, Puzzle, Globe, Book } from 'lucide-react';

export default function BasicKnowledgePage({ onBack }) {
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
            <Book size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">Basic Knowledge & Concepts</h1>
        </div>
        <p className="text-gray-600 mb-8 text-lg">
          Building foundational understanding of everyday concepts, numbers, and the world around them.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Numbers & Shapes */}
          <div className="bg-orange-50 p-6 rounded-xl shadow-md border border-orange-200">
            <h2 className="text-2xl font-bold text-orange-800 mb-4 flex items-center gap-2">
              <Puzzle size={24} /> Numbers, Shapes & Colors
            </h2>
            <p className="text-gray-700 mb-4">
              Making learning math and visual concepts fun and practical.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Count objects together during daily activities (e.g., "How many apples?").</li>
              <li>Point out shapes in the environment (e.g., "The window is a rectangle").</li>
              <li>Sort toys or clothes by color.</li>
              <li>Use interactive games and apps designed for early learners.</li>
            </ul>
          </div>

          {/* Section 2: Understanding the World */}
          <div className="bg-emerald-50 p-6 rounded-xl shadow-md border border-emerald-200">
            <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
              <Globe size={24} /> Exploring the World
            </h2>
            <p className="text-gray-700 mb-4">
              Introducing basic science, nature, and community concepts.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Talk about animals and their sounds/habitats.</li>
              <li>Visit a local park or library and discuss what you see.</li>
              <li>Explain simple cause and effect (e.g., "If we water the plant, it grows").</li>
              <li>Read non-fiction picture books about different topics.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-md">
          <h3 className="text-xl font-bold text-blue-800 mb-3">💡 Tip: Everyday Learning</h3>
          <p className="text-gray-700">
            Integrate learning into daily routines. Grocery shopping can be about counting fruits, or walking outside can be about identifying sounds and colors. Every moment is a learning opportunity!
          </p>
        </div>

      </div>
    </div>
  );
}