// src/components/Parentcomponent/SupportingMaterials/HandwritingPage.jsx
import { useRef, useState, useEffect } from 'react';
import { ArrowLeft, Pencil, PenTool, Eraser } from 'lucide-react';

export default function HandwritingPage({ onBack }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  // Letters to trace
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  // Canvas setup
  useEffect(() => {
    drawLetter();
  }, [currentLetterIndex]);

  const drawLetter = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw outline letter
    ctx.font = '200px Arial';
    ctx.fillStyle = 'rgba(79, 70, 229, 0.2)'; // Light indigo
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letters[currentLetterIndex], canvas.width / 2, canvas.height / 2);

    // Setup for drawing
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#4f46e5'; // Indigo for tracing
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => setDrawing(false);

  const clearCanvas = () => {
    drawLetter();
  };

  const nextLetter = () => {
    setCurrentLetterIndex((prev) => (prev + 1) % letters.length);
    clearCanvas();
  };

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
          Develop fine motor skills by tracing letters.
        </p>

        <div className="bg-indigo-50 p-6 rounded-xl shadow-md border border-indigo-200 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
            <Eraser size={24} /> Trace the Letter
          </h2>
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="bg-white border border-indigo-200 rounded-xl mb-4 touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={(e) => startDrawing(e.touches[0])}
            onTouchMove={(e) => draw(e.touches[0])}
            onTouchEnd={stopDrawing}
          />
          <div className="flex gap-4">
            <button
              onClick={clearCanvas}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={nextLetter}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Next Letter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
