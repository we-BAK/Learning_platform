import { useEffect, useState, useMemo } from "react";
import supabase from "../../lib/supabaseClient";
import { toast } from "react-toastify";
import { UserCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

// A simple loading spinner component
const LoadingSpinner = ({ text }) => (
  <div className="flex flex-col items-center justify-center text-center py-10">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    <p className="mt-4 text-lg font-medium text-gray-600">{text}</p>
  </div>
);

// A reusable card for displaying lists
const InfoCard = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 flex flex-col h-full">
    <h3 className="text-xl font-bold text-gray-800 p-5 border-b border-gray-200">
      {title}
    </h3>
    <div className="flex-grow p-3 overflow-y-auto" style={{maxHeight: '60vh'}}>
      {children}
    </div>
  </div>
);

export default function AssignTherapistToUnassignedStudentV2() {
  // State Management
  const [students, setStudents] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  const [studentSearch, setStudentSearch] = useState("");
  const [therapistSearch, setTherapistSearch] = useState("");

  const [loading, setLoading] = useState({ data: true, assigning: false });

  // Fetch initial data concurrently for better performance
  const fetchInitialData = async () => {
    setLoading({ data: true, assigning: false });
    try {
      const [studentResponse, therapistResponse] = await Promise.all([
        supabase.from("children").select("id, full_name").is("therapist_id", null),
        supabase.from("profiles").select("id, full_name").eq("role", "therapist"),
      ]);

      if (studentResponse.error) throw studentResponse.error;
      if (therapistResponse.error) throw therapistResponse.error;

      setStudents(studentResponse.data || []);
      setTherapists(therapistResponse.data || []);
      
    } catch (error) {
      console.error("Failed to fetch initial data:", error);
      toast.error("Failed to load necessary data. Please refresh.");
    } finally {
      setLoading({ data: false, assigning: false });
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);
  
  // Memoize filtered lists to prevent recalculation on every render
  const filteredStudents = useMemo(() =>
    students.filter(s =>
      s.full_name.toLowerCase().includes(studentSearch.toLowerCase())
    ), [students, studentSearch]
  );

  const filteredTherapists = useMemo(() =>
    therapists.filter(t =>
      t.full_name.toLowerCase().includes(therapistSearch.toLowerCase())
    ), [therapists, therapistSearch]
  );
  
  // Handle the assignment logic
  const handleAssign = async () => {
    if (!selectedStudent || !selectedTherapist) {
      toast.warn("Please select a student and a therapist.");
      return;
    }
    setLoading({ ...loading, assigning: true });
    try {
      // Use backend API instead of direct Supabase call
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/assign_therapist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          child_id: selectedStudent.id,
          therapist_id: selectedTherapist.id
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to assign therapist');
      }

      toast.success(`Assigned ${selectedTherapist.full_name} to ${selectedStudent.full_name}!`);
      
      // Reset state and refetch data to update lists
      setSelectedStudent(null);
      setSelectedTherapist(null);
      fetchInitialData();

    } catch (error) {
      console.error("Assignment failed:", error);
      toast.error(error.message || "Failed to assign therapist.");
    } finally {
      setLoading({ ...loading, assigning: false });
    }
  };

  // Main render logic
  if (loading.data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner text="Loading Dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Assignment Dashboard
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Select a student and a therapist to create an assignment.
          </p>
        </header>

        {students.length === 0 ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-6 rounded-lg shadow-md text-center max-w-2xl mx-auto">
            <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-xl font-semibold">All students are assigned!</p>
            <p className="text-md mt-1">Great job, the assignment queue is empty.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Students Column */}
              <InfoCard title="Unassigned Students">
                <input
                  type="text"
                  placeholder="Search for a student..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
                <ul className="space-y-2">
                  {filteredStudents.map((student) => (
                    <li
                      key={student.id}
                      onClick={() => setSelectedStudent(student)}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out group border-2
                        ${selectedStudent?.id === student.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                          : 'bg-white hover:bg-indigo-50 hover:border-indigo-400 border-transparent'
                        }`}
                    >
                      <UserCircleIcon className={`h-6 w-6 mr-3 ${selectedStudent?.id === student.id ? 'text-white' : 'text-gray-400 group-hover:text-indigo-600'}`} />
                      <span className="font-medium">{student.full_name}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>

              {/* Therapists Column */}
              <div className={`transition-opacity duration-300 ${!selectedStudent ? 'opacity-50' : 'opacity-100'}`}>
                <InfoCard title="Available Therapists">
                  <input
                    type="text"
                    placeholder="Search for a therapist..."
                    value={therapistSearch}
                    onChange={(e) => setTherapistSearch(e.target.value)}
                    disabled={!selectedStudent}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:bg-gray-100"
                  />
                  <ul className="space-y-2">
                    {filteredTherapists.map((therapist) => (
                      <li
                        key={therapist.id}
                        onClick={() => selectedStudent && setSelectedTherapist(therapist)}
                        className={`flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out group border-2
                          ${selectedStudent ? 'cursor-pointer' : 'cursor-not-allowed'}
                          ${selectedTherapist?.id === therapist.id
                            ? 'bg-teal-500 text-white border-teal-500 shadow-md'
                            : 'bg-white hover:bg-teal-50 hover:border-teal-400 border-transparent'
                          }`}
                      >
                        <UserCircleIcon className={`h-6 w-6 mr-3 ${selectedTherapist?.id === therapist.id ? 'text-white' : 'text-gray-400 group-hover:text-teal-600'}`} />
                        <span className="font-medium">{therapist.full_name}</span>
                      </li>
                    ))}
                  </ul>
                </InfoCard>
              </div>
            </div>

            {/* Assignment Action Area */}
            {selectedStudent && (
              <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200/80 text-center transform transition-all duration-300 animate-fade-in-up">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Confirm Assignment
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  You are about to assign <span className="font-semibold text-teal-600">{selectedTherapist?.full_name || '...'}</span> to <span className="font-semibold text-indigo-600">{selectedStudent.full_name}</span>.
                </p>
                <button
                  onClick={handleAssign}
                  disabled={!selectedTherapist || loading.assigning}
                  className="w-full max-w-md mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition transform hover:-translate-y-1 active:translate-y-0 text-lg"
                >
                  {loading.assigning ? 'Assigning...' : 'Confirm & Assign'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}