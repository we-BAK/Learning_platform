// RegistrationForm.jsx
import React, { useState } from "react";
import StepIndicator from "../components/RegistrationForm/StepIndicator";
import StepIntro from "../components/RegistrationForm/Steps/StepIntro";
import StepGuardianInfo from "../components/RegistrationForm/Steps/stepGuardianInfo";
import StepChildInfo from "../components/RegistrationForm/Steps/StepChildInfo";
import StepTherapistInfo from "../components/RegistrationForm/Steps/StepTherapistInfo";
import StepReview from "../components/RegistrationForm/Steps/StepReview";

import  supabase  from '../lib/supabaseClient';

const RegistrationForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    guardianName: '',
    email: '',
    phone: '',
    region: '',
    city: '',
    language: '',
    childName: '',
    age: '',
    gender: '',
    diagnosis: null, // This will now hold the child's diagnosis File object
    school: '',
    hasTherapist: '',
    therapistInfo: '',
    therapistPhone: '',
    diagnosisFile: null, // This is for the therapist's diagnosis File object
  });

  // Handle moving forward, capped at the last step
  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  // Handle moving back, ensuring it doesn't go below 0
  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  // Handle updating form fields
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Final form submission handler - THIS IS THE UPDATED SUPABASE INTEGRATION
  const handleSubmit = async () => { // <--- Make this function async!
    console.log("Attempting to submit form data to Supabase:", formData);

    try {
      let childDiagnosisFileUrl = null;
      let therapistDiagnosisFileUrl = null;

      // 1. Upload Child Diagnosis File to Supabase Storage
      if (formData.diagnosis instanceof File) {
        const fileExtension = formData.diagnosis.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExtension}`;
        const filePath = `child-diagnosis/${fileName}`; // Path inside your bucket

        const { data, error: uploadError } = await supabase.storage
          .from('reg-documents') // <<< Use your confirmed bucket name: 'reg-documents'
          .upload(filePath, formData.diagnosis, {
            cacheControl: '3600',
            upsert: false // Set to true if you want to overwrite existing files with the same name
          });

        if (uploadError) {
          console.error('Error uploading child diagnosis file:', uploadError);
          throw new Error(`Failed to upload child diagnosis: ${uploadError.message}`);
        }
        // Store only the path (relative to the bucket)
        childDiagnosisFileUrl = data.path;
      }

      // 2. Upload Therapist Diagnosis File to Supabase Storage (if 'hasTherapist' is 'yes')
      if (formData.hasTherapist === 'yes' && formData.diagnosisFile instanceof File) {
        const fileExtension = formData.diagnosisFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}-therapist.${fileExtension}`;
        const filePath = `therapist-diagnosis/${fileName}`; // Path inside your bucket

        const { data, error: uploadError } = await supabase.storage
          .from('reg-documents') // <<< Use your confirmed bucket name: 'reg-documents'
          .upload(filePath, formData.diagnosisFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Error uploading therapist diagnosis file:', uploadError);
          throw new Error(`Failed to upload therapist diagnosis: ${uploadError.message}`);
        }
        // Store only the path (relative to the bucket)
        therapistDiagnosisFileUrl = data.path;
      }

      // 3. Insert Form Data (and file URLs) into Supabase Database
      const { data, error: dbError } = await supabase // <--- This is the key line for DB insert!
        .from('registrations') // <<< Your table name in Supabase (must be 'registrations')
        .insert([
          {
            guardian_name: formData.guardianName,
            email: formData.email,
            phone: formData.phone,
            region: formData.region,
            city: formData.city,
            language: formData.language,
            child_name: formData.childName,
            age: parseInt(formData.age), // Ensure age is parsed as integer
            gender: formData.gender,
            diagnosis_file_url: childDiagnosisFileUrl, // Store the path
            school: formData.school,
            has_therapist: formData.hasTherapist,
            therapist_info: formData.therapistInfo,
            therapist_phone: formData.therapistPhone,
            therapist_diagnosis_file_url: therapistDiagnosisFileUrl, // Store the path
            request_status: 'pending', // Default status
          }
        ])
        .select(); // Use .select() to return the inserted data

      if (dbError) {
        console.error('Error inserting data into Supabase:', dbError);
        throw new Error(`Failed to save registration: ${dbError.message}`);
      }

      alert("Registration submitted successfully!");
      console.log("Supabase insertion successful:", data);
      // Reset form and go back to intro
      setStep(0);
      setFormData({
        guardianName: '', email: '', phone: '', region: '', city: '', language: '',
        childName: '', age: '', gender: '', diagnosis: null, school: '',
        hasTherapist: '', therapistInfo: '', therapistPhone: '', diagnosisFile: null,
      });

    } catch (error) {
      console.error("Submission error:", error);
      alert(`An error occurred during submission: ${error.message}`);
    }
  };

  // Registration steps
  const steps = [
    <StepIntro handleNext={handleNext} />,
    <StepGuardianInfo
      formData={formData}
      handleChange={handleChange}
      handleNext={handleNext}
      handleBack={handleBack}
    />,
    <StepChildInfo
      formData={formData}
      handleChange={handleChange}
      handleNext={handleNext}
      handleBack={handleBack}
    />,
    <StepTherapistInfo
      formData={formData}
      handleChange={handleChange}
      handleNext={handleNext}
      handleBack={handleBack}
    />,
    <StepReview
      formData={formData}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
    />
  ];

  return (
    <div className="max-w-6xl h-auto mx-auto mt-10 p-8 mb-10 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-2">
        Child Wellness Registration
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Complete the form below to register for our wellness services
      </p>

      {/* Step indicator */}
      <StepIndicator step={step} />

      {/* Render current step component */}
      {steps[step]}
    </div>
  );
};

export default RegistrationForm;