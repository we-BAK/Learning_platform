import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Utensils, Moon, CheckCircle2, RotateCcw, ArrowLeft } from "lucide-react";

// --- 1. Image Imports ---
import wakeup from "../../../assets/routine/wakeup.png";
import brush from "../../../assets/routine/brush.jpeg";
import breakfast from "../../../assets/routine/Eating.jpg";
import clothes from "../../../assets/routine/wearing.jpg";

// --- 2. Routine Data Configuration ---
const ROUTINES = {
  morning: {
    title: "Morning Routine",
    color: "bg-amber-100 border-amber-400 text-amber-700",
    icon: <Sun className="w-10 h-10" />,
    items: [
      { id: "m1", text: "Wake up", order: 1, img: wakeup },
      { id: "m2", text: "Brush teeth", order: 2, img: brush },
      { id: "m3", text: "Eat breakfast", order: 3, img: breakfast },
      { id: "m4", text: "Put on clothes", order: 4, img: clothes },
    ],
  },
  lunch: {
    title: "Lunch Time",
    color: "bg-green-100 border-green-400 text-green-700",
    icon: <Utensils className="w-10 h-10" />,
    items: [], // Add items here when ready
  },
  night: {
    title: "Night Routine",
    color: "bg-indigo-100 border-indigo-400 text-indigo-700",
    icon: <Moon className="w-10 h-10" />,
    items: [], // Add items here when ready
  },
};

// Added onBack prop to handle returning to the materials list
export default function RoutineGame({ onBack }) {
  const [selectedPack, setSelectedPack] = useState(null);
  const [shuffledItems, setShuffledItems] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const startPack = (key) => {
    const pack = ROUTINES[key];
    if (!pack.items || pack.items.length === 0) return;
    
    const shuffled = [...pack.items].sort(() => Math.random() - 0.5);
    setSelectedPack(key);
    setShuffledItems(shuffled);
    setUserSequence([]);
    setIsWinner(false);
    setErrorMsg(false);
  };

  const handleCardClick = (item) => {
    if (userSequence.find((i) => i.id === item.id) || isWinner) return;
    
    const newSequence = [...userSequence, item];
    setUserSequence(newSequence);
    setErrorMsg(false);

    if (newSequence.length === ROUTINES[selectedPack].items.length) {
      const isCorrect = newSequence.every((val, index) => val.order === index + 1);
      if (isCorrect) {
        setIsWinner(true);
      } else {
        setErrorMsg(true);
      }
    }
  };

  const resetGame = () => {
    setSelectedPack(null);
    setUserSequence([]);
    setIsWinner(false);
    setErrorMsg(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={onBack} 
            className="flex items-center text-slate-500 font-bold hover:text-blue-600 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Materials
          </button>
        </div>

        {!selectedPack ? (
          <div className="text-center">
            <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Routine Builder</h1>
            <p className="text-slate-600 mb-12 text-lg font-medium">Pick a time of day and sort the activities!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.keys(ROUTINES).map((key) => (
                <motion.button
                  whileHover={{ scale: 1.05, translateY: -5 }}
                  whileTap={{ scale: 0.95 }}
                  key={key}
                  onClick={() => startPack(key)}
                  className={`p-10 rounded-[2.5rem] border-b-8 transition-all shadow-xl flex flex-col items-center ${ROUTINES[key].color}`}
                >
                  <div className="p-4 bg-white/50 rounded-full">{ROUTINES[key].icon}</div>
                  <span className="mt-6 text-2xl font-black uppercase tracking-tight">
                    {ROUTINES[key].title}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <button 
              onClick={resetGame} 
              className="group flex items-center text-slate-500 font-bold hover:text-indigo-600 transition"
            >
              <RotateCcw className="w-6 h-6 mr-2 group-hover:rotate-[-45deg] transition-transform" /> 
              Change Routine
            </button>

            <div className="text-center bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold mb-6 text-slate-700 uppercase tracking-wide">Tap in Order:</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {shuffledItems.map((item) => (
                  <button
                    key={item.id}
                    disabled={userSequence.some(u => u.id === item.id)}
                    onClick={() => handleCardClick(item)}
                    className={`group relative overflow-hidden rounded-2xl border-4 transition-all shadow-md ${
                      userSequence.some(u => u.id === item.id)
                        ? "border-slate-100 opacity-40 grayscale pointer-events-none"
                        : "border-indigo-200 hover:border-indigo-500 active:scale-90"
                    }`}
                  >
                    <img src={item.img} alt={item.text} className="w-28 h-28 md:w-36 md:h-36 object-cover" />
                    <div className="bg-indigo-50 text-indigo-900 text-xs font-black py-2 uppercase tracking-tighter">
                      {item.text}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-200/50 p-6 md:p-10 rounded-[3rem] min-h-[350px] border-4 border-dashed border-slate-300 relative">
              <h3 className="text-slate-400 font-black text-center uppercase tracking-[0.2em] mb-8 text-sm">
                Your Sequence
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <AnimatePresence>
                  {userSequence.map((item, index) => (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      key={item.id}
                      className="relative bg-white border-2 border-indigo-100 p-3 rounded-[2rem] shadow-lg flex flex-col items-center"
                    >
                      <div className="absolute -top-3 -left-3 bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-xl z-10 shadow-lg border-2 border-white">
                        {index + 1}
                      </div>
                      <img src={item.img} alt={item.text} className="w-full aspect-square object-cover rounded-[1.5rem] mb-3" />
                      <span className="text-base font-bold text-slate-800 pb-1">{item.text}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {Array.from({ length: 4 - userSequence.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="border-4 border-slate-300 border-dashed rounded-[2rem] h-40 flex items-center justify-center opacity-30">
                    <span className="text-4xl font-black text-slate-400">?</span>
                  </div>
                ))}
              </div>

              {errorMsg && (
                <motion.div 
                  initial={{ x: [-10, 10, -10, 10, 0] }}
                  className="mt-12 p-5 bg-red-100 text-red-700 rounded-2xl text-center font-bold text-lg shadow-sm"
                >
                  Oops! Not quite. 
                  <button onClick={() => startPack(selectedPack)} className="ml-3 underline text-red-900 font-black">
                    Try Again
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Win Modal */}
        <AnimatePresence>
          {isWinner && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/90 flex items-center justify-center p-6 z-50 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.5 }} animate={{ scale: 1 }}
                className="bg-white rounded-[4rem] p-12 text-center max-w-md shadow-2xl relative border-t-[12px] border-green-500"
              >
                <CheckCircle2 className="w-28 h-28 text-green-500 mx-auto mb-6" />
                <h2 className="text-6xl font-black text-slate-800 mb-2">CONGRA!</h2>
                <p className="text-slate-600 text-2xl font-bold mb-10">You're a Routine Hero!</p>
                <button 
                  onClick={resetGame}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-6 px-12 rounded-[2rem] text-2xl shadow-xl w-full"
                >
                  PLAY AGAIN
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}