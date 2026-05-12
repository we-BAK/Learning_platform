// src/components/Parentcomponent/SupportingMaterials/FocusOnThingsPage.jsx
import { useState } from 'react';
import { ArrowLeft, Target } from 'lucide-react';

export default function FocusOnThingsPage({ onBack }) {
  const [score, setScore] = useState(0);
  const [targetIndex, setTargetIndex] = useState(Math.floor(Math.random() * 9)); // 0-8 grid

  // Handle when a square is clicked
  const handleClick = (index) => {
    if (index === targetIndex) {
      setScore(score + 1);
      // Move target to a new random square
      let newTarget;
      do {
        newTarget = Math.floor(Math.random() * 9);
      } while (newTarget === targetIndex);
      setTargetIndex(newTarget);
    } else {
      // Optional: give feedback
      alert('Try again!');
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-full">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 text-lg font-medium"
      >
        <ArrowLeft size={20} /> Back to Supporting Materials
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center shadow-inner shrink-0">
            <Target size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">Focus Game</h1>
        </div>

        <p className="text-gray-600 mb-6 text-lg text-center">
          Click the square with the target 🎯 as quickly as you can to improve focus and attention!
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`w-24 h-24 flex items-center justify-center rounded-lg cursor-pointer 
                border-2 ${index === targetIndex ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-gray-100'} 
                hover:bg-gray-200 transition-colors`}
            >
              {index === targetIndex && <Target size={32} className="text-green-600" />}
            </div>
          ))}
        </div>

        <p className="text-xl font-bold text-gray-800 mb-4">Score: {score}</p>

        <button
          onClick={() => {
            setScore(0);
            setTargetIndex(Math.floor(Math.random() * 9));
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}
