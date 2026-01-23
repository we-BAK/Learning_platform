import { useCallback, useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Mail, Phone, Eye } from 'lucide-react';
import RequestModal from './RequestModal';

const ParentRequests = () => {
  const supabase = useSupabaseClient();
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingRequests = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch ALL pending registrations (remove .single())
      const { data, error: fetchError } = await supabase
        .from('registrations')
        .select('*')
        .eq('request_status', 'pending') // Only pending status
        .order('created_at', { ascending: false }); // No .single() here

      if (fetchError) throw fetchError;
      setPendingRequests(data || []); // Will receive array of all matches
    } catch (err) {
      console.error('Error:', err.message);
      setError('Failed to load pending requests');
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchPendingRequests();

    // Realtime subscription
    const channel = supabase
      .channel('pending_requests')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'registrations',
        filter: 'request_status=eq.pending' // Only listen to pending changes
      }, fetchPendingRequests)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [fetchPendingRequests, supabase]);

  return (
    <div className="min-h-screen bg-blue-50 px-4 sm:px-6 md:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-2">
        Pending Parent Requests ({pendingRequests.length})
      </h1>
      
      {/* Error/Loading states */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      
      {/* Results */}
      {!loading && pendingRequests.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests found.</p>
      ) : (
        <ul className="space-y-4 max-w-4xl mx-auto">
          {pendingRequests.map((request) => (
            <li 
              key={request.id}
              className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start gap-4 hover:shadow-lg transition"
            >
              <div className="space-y-2">
                <p className="text-lg font-bold text-gray-900">
                  {request.guardian_name}
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    Pending
                  </span>
                </p>
                <div className="flex items-center text-gray-700 text-sm gap-2">
                  <Mail className="w-4 h-4 text-sky-500" />
                  <span>{request.email}</span>
                </div>
                <div className="flex items-center text-gray-700 text-sm gap-2">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span>{request.phone}</span>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2">
                <button
                  onClick={() => setSelectedRequest(request)}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <time 
                  dateTime={request.created_at}
                  className="text-xs text-gray-500"
                >
                  Submitted: {new Date(request.created_at).toLocaleDateString()}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {selectedRequest && (
        <RequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onActionComplete={fetchPendingRequests} // Refreshes list after approval/rejection
        />
      )}
    </div>
  );
};

export default ParentRequests;