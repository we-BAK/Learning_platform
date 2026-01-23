import React, { useEffect, useState } from "react";
import { Input } from "../../Ui/Input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../Ui/Select";
import { Button } from "../../Ui/Button";

const StepChildInfo = ({ formData, handleChange, handleBack, handleNext }) => {
  const [errors, setErrors] = useState({});
  const [diagnosisFile, setDiagnosisFile] = useState(null);

  const validateField = (name, value) => {
    switch (name) {
      case "childName":
        return value.trim() ? "" : "required";
      case "age":
        return /^\d+$/.test(value) && +value > 0 ? "" : "invalid";
      case "gender":
        return value ? "" : "required";
      case "diagnosis":
        return diagnosisFile ? "" : "required"; // Ensure diagnosis file is uploaded
      default:
        return "";
    }
  };

  useEffect(() => {
    const newErrors = {};
    ["childName", "age", "gender", "diagnosis"].forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
  }, [formData, diagnosisFile]);

  const isFormValid = Object.values(errors).every((e) => e === "");

  const getBorderClass = (field) => {
    if (errors[field]) return "border-red-500";
    if (formData[field]) return "border-green-500";
    return "";
  };

  const handleDiagnosisUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDiagnosisFile(file);
      handleChange("diagnosis", file); // You can send this to backend later
    }
  };

  const handleNextStep = () => {
    if (isFormValid) handleNext();
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-indigo-700 mb-5 text-center">Child Information</h2>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Child's Full Name</label>
          <Input
            placeholder="Enter full name"
            value={formData.childName}
            onChange={(e) => handleChange("childName", e.target.value)}
            className={`w-full ${getBorderClass("childName")}`}
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <Input
            placeholder="Enter age (e.g., 6)"
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
            className={`w-full ${getBorderClass("age")}`}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <Select
            value={formData.gender}
            onValueChange={(value) => handleChange("gender", value)}
          >
            <SelectTrigger className={`w-full ${getBorderClass("gender")} border-gray-300 focus:ring-2 focus:ring-indigo-500`}>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Diagnosis Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Diagnosis Document (required)
          </label>
          <Input
            type="file"
            accept="image/*,.pdf"
            onChange={handleDiagnosisUpload}
            className="w-full border-gray-300"
          />
          {diagnosisFile && (
            <p className="text-sm text-green-600 mt-1">Uploaded: {diagnosisFile.name}</p>
          )}
        </div>

        {/* School (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current School (if any)</label>
          <Input
            placeholder="Enter current school name"
            value={formData.school}
            onChange={(e) => handleChange("school", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button onClick={handleBack} className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-full shadow-md">
            Back
          </Button>
          <Button
            onClick={handleNextStep}
            disabled={!isFormValid}
            className={`${
              isFormValid ? "bg-indigo-600" : "bg-gray-400"
            } text-white hover:bg-indigo-700 transition-all duration-200 px-6 py-2 rounded-full shadow-md`}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepChildInfo;
