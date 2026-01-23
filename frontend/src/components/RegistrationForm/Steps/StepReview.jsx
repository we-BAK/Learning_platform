import React from "react";
import { Button } from "../../Ui/Button";

const StepReview = ({ formData, handleBack, handleSubmit }) => (
  <div>
    <h2 className="text-xl font-bold text-indigo-700 mb-4">Review & Confirm</h2>

    <div className="text-gray-800 space-y-4 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
      <div>
        <h3 className="font-semibold text-lg text-blue-600">Guardian Info</h3>
        <p><strong>Name:</strong> {formData.guardianName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Region:</strong> {formData.region}</p>
        <p><strong>Language:</strong> {formData.language}</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg text-blue-600">Child Info</h3>
        <p><strong>Name:</strong> {formData.childName}</p>
        <p><strong>Age:</strong> {formData.age}</p>
        <p><strong>Gender:</strong> {formData.gender}</p>
        <p>
          <strong>Diagnosis:</strong>{" "}
          {formData.diagnosis?.name || "N/A"}
        </p>
        <p><strong>School:</strong> {formData.school || "N/A"}</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg text-blue-600">Therapist Linkage</h3>
        <p><strong>Has Therapist:</strong> {formData.hasTherapist}</p>
        {formData.hasTherapist === "yes" && (
          <>
            <p><strong>Therapist Info:</strong> {formData.therapistInfo}</p>
            <p><strong>Therapist Phone:</strong> {formData.therapistPhone}</p>
          </>
        )}
      </div>
    </div>

    <div className="flex justify-between mt-6">
      <Button variant="outline" onClick={handleBack}>
        Back
      </Button>
      <Button type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  </div>
);

export default StepReview;
