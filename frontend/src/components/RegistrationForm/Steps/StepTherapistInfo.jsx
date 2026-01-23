import React, { useState } from "react";

const StepTherapistInfo = ({ formData, handleChange, handleBack, handleNext }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (formData.hasTherapist === "yes") {
      if (!formData.therapistInfo) {
        newErrors.therapistInfo = "Therapist's name or code is required.";
      }
      if (!formData.therapistPhone) {
        newErrors.therapistPhone = "Therapist's phone number is required.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      handleNext();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleChange("diagnosisFile", file);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Therapist Information
      </h2>

      <div className="space-y-5">
        {/* Do you have a therapist? */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you already have a therapist?
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="hasTherapist"
                value="yes"
                checked={formData.hasTherapist === "yes"}
                onChange={(e) => handleChange("hasTherapist", e.target.value)}
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="hasTherapist"
                value="no"
                checked={formData.hasTherapist === "no"}
                onChange={(e) => handleChange("hasTherapist", e.target.value)}
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* If yes, show therapist info fields */}
        {formData.hasTherapist === "yes" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Therapist's Name or Code
              </label>
              <input
                type="text"
                placeholder="Enter therapist's name or code"
                value={formData.therapistInfo}
                onChange={(e) => handleChange("therapistInfo", e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
              {errors.therapistInfo && (
                <p className="text-sm text-red-600 mt-1">{errors.therapistInfo}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Therapist's Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter therapist's phone number"
                value={formData.therapistPhone}
                onChange={(e) => handleChange("therapistPhone", e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
              {errors.therapistPhone && (
                <p className="text-sm text-red-600 mt-1">{errors.therapistPhone}</p>
              )}
            </div>
          </>
        )}

        {/* File input for uploading diagnosis (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Therapist's Diagnosis (Optional)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border-gray-300"
          />
          {formData.diagnosisFile && (
            <p className="text-sm text-gray-600 mt-1">
              File uploaded: {formData.diagnosisFile.name}
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <button
            onClick={handleBack}
            className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-full shadow"
          >
            Back
          </button>
          <button
            onClick={handleNextStep}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full shadow transition duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepTherapistInfo;
