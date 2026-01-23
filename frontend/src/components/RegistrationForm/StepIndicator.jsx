import React from "react";

const StepIndicator = ({ step }) => {
  const stepNames = ["Intro", "Guardian Info", "Child Info", "Therapist Info", "Review"];
  
  return (
    <div className="flex justify-center space-x-4 mb-6">
      {stepNames.map((name, index) => (
        <div key={index} className={`w-10 h-10 flex items-center justify-center rounded-full ${index <= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
          {index + 1} {/* This will now correctly show the step number */}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
