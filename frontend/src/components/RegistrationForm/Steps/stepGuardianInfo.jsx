import React, { useEffect, useState } from "react";
import { Input } from "../../Ui/Input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../Ui/Select";
import { Button } from "../../Ui/Button";

const StepGuardianInfo = ({ formData, handleChange, handleNext }) => {
  const regions = ["Addis Ababa", "Gambela", "Oromia", "Amhara"];
  const cities = {
    "Addis Ababa": ["Bole", "Lideta", "Akaki"],
    "Gambela": ["Gambela City", "Jikawo"],
    "Oromia": ["Adama", "Bishoftu"],
    "Amhara": ["Bahirdar", "Gondar"]
  };

  const [errors, setErrors] = useState({});

  // Validate individual fields
  const validateFields = () => {
    const newErrors = {};

    if (!formData.guardianName.trim()) newErrors.guardianName = "Name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email format";
    if (!formData.phone.match(/^[0-9]{10}$/)) newErrors.phone = "Phone must be 10 digits";
    if (!formData.region) newErrors.region = "Region is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.language) newErrors.language = "Language is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Trigger validation before going to next step
  const handleNextStep = () => {
    if (validateFields()) {
      handleNext();
    }
  };

  const getBorderClass = (field) => {
    if (errors[field]) return "border-red-500";
    if (formData[field]) return "border-gray-300";
    return "";
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-indigo-700 mb-5 text-center">Guardian Information</h2>
      <div className="space-y-4">
        {[
          { label: "Full Name", name: "guardianName", type: "text", placeholder: "Enter your full name" },
          { label: "Email", name: "email", type: "email", placeholder: "your.email@example.com" },
          { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter your phone number" },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <Input
              type={type}
              placeholder={placeholder}
              value={formData[name]}
              onChange={(e) => handleChange(name, e.target.value)}
              className={`w-full ${getBorderClass(name)}`}
            />
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
            <Select
              value={formData.region}
              onValueChange={(value) => handleChange("region", value)}
            >
              <SelectTrigger className={`w-full ${getBorderClass("region")} border-gray-300`}>
                <SelectValue placeholder="Select your region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <Select
              value={formData.city}
              onValueChange={(value) => handleChange("city", value)}
            >
              <SelectTrigger className={`w-full ${getBorderClass("city")} border-gray-300`}>
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                {(formData.region && cities[formData.region] ? cities[formData.region] : []).map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
          <Select
            value={formData.language}
            onValueChange={(value) => handleChange("language", value)}
          >
            <SelectTrigger className={`w-full ${getBorderClass("language")} border-gray-300`}>
              <SelectValue placeholder="Select your preferred language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Amharic">Amharic</SelectItem>
            </SelectContent>
          </Select>
          {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language}</p>}
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleNextStep}
            className="bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200 px-6 py-2 rounded-full shadow-md"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepGuardianInfo;
