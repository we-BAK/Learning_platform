import React, { useState } from 'react';
import { toast } from 'react-toastify';

const RequestModal = ({ request, onClose, onActionComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleAction = async (action) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/${action === 'approve' ? 'approve_registration' : 'reject'}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Request failed');

      toast.success(`Registration ${action}d successfully`);
      onActionComplete(request.id);
      onClose();
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Parent Registration Details</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
          <div><strong>Guardian Name:</strong><p>{request.guardian_name}</p></div>
          <div><strong>Email:</strong><p>{request.email}</p></div>
          <div><strong>Phone:</strong><p>{request.phone}</p></div>
          <div><strong>Region:</strong><p>{request.region}</p></div>
          <div><strong>City:</strong><p>{request.city}</p></div>
          <div><strong>Language:</strong><p>{request.language}</p></div>
          <div><strong>Child Name:</strong><p>{request.child_name}</p></div>
          <div><strong>Age:</strong><p>{request.age}</p></div>
          <div><strong>Gender:</strong><p>{request.gender}</p></div>
          <div className="col-span-2">
            <strong>Diagnosis File:</strong>
            <p>
              {request.diagnosis_file_url ? (
                <a href={request.diagnosis_file_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                  View File
                </a>
              ) : 'Not provided'}
            </p>
          </div>
          <div className="col-span-2"><strong>School:</strong><p>{request.school || 'Not provided'}</p></div>
          <div><strong>Has Therapist:</strong><p>{request.has_therapist}</p></div>
          <div><strong>Therapist Info:</strong><p>{request.therapist_info || 'N/A'}</p></div>
          <div><strong>Therapist Phone:</strong><p>{request.therapist_phone || 'N/A'}</p></div>
          <div className="col-span-2">
            <strong>Therapist Diagnosis File:</strong>
            <p>
              {request.therapist_diagnosis_file_url ? (
                <a href={request.therapist_diagnosis_file_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                  View File
                </a>
              ) : 'Not provided'}
            </p>
          </div>
          <div className="col-span-2"><strong>Submitted At:</strong><p>{new Date(request.created_at).toLocaleString()}</p></div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => handleAction('approve')}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 shadow"
          >
            {loading ? 'Processing...' : 'Approve'}
          </button>
          <button
            onClick={() => handleAction('reject')}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 shadow"
          >
            Reject
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 shadow"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
