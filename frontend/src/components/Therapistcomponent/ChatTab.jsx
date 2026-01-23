// src/components/therapist/ChatTab.jsx
import { useState, useEffect, useRef } from "react";
// Removed useSession as current schema uses 'sender' string, not user UUID for message ownership
import supabase from "@/lib/supabaseClient";
import { Send, MessageSquareText, Loader2 } from "lucide-react";

export default function ChatTab({ studentId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(""); // Renamed from newMessage for consistency with original code
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch messages between therapist and student
  const fetchMessages = async () => {
    if (!studentId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from("messages")
      .select("*")
      .eq("child_id", studentId) // Filter by child_id as per your schema
      .order("sent_at", { ascending: true }); // Order by sent_at as per your schema

    if (fetchError) {
      console.error("Error fetching messages:", fetchError.message);
      setError("Failed to load messages.");
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  // Send a new message
  const sendMessage = async (e) => { // Renamed from handleSendMessage
    if (e) e.preventDefault(); // Prevent form submission if triggered by form
    if (!input.trim() || !studentId) return;

    const messagePayload = {
      child_id: studentId,
      sender: "therapist", // As per your schema
      text: input.trim(), // As per your schema
    };

    // Optimistic update: Add message to UI immediately
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        ...messagePayload,
        id: Math.random(), // Temporary ID for optimistic update
        sent_at: new Date().toISOString(), // Use ISO string for consistency
      },
    ]);
    setInput(""); // Clear input immediately

    const { error: sendError } = await supabase
      .from("messages")
      .insert(messagePayload);

    if (sendError) {
      console.error("Error sending message:", sendError.message);
      setError("Failed to send message.");
      // Revert optimistic update if there's an error (optional, but good for robust apps)
      setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== messagePayload.id));
      // Re-fetch to ensure consistency if optimistic update fails
      fetchMessages();
    }
    // Realtime subscription will handle displaying the new message (and correcting temporary ID)
  };

  useEffect(() => {
    if (studentId) {
      fetchMessages();

      // Set up real-time subscription
      const channel = supabase
        .channel(`chat_room_${studentId}`) // Unique channel name for this specific child's chat
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `child_id=eq.${studentId}` // Filter by child_id
          },
          (payload) => {
            // Check if the message is already in our state (from optimistic update)
            // If it is, replace it with the real message from DB (which will have a real ID and accurate timestamp)
            setMessages((prevMessages) => {
                const existingIndex = prevMessages.findIndex(msg => msg.id === payload.new.id);
                if (existingIndex > -1) {
                    // Replace the optimistic message with the actual one from DB
                    const newMsgs = [...prevMessages];
                    newMsgs[existingIndex] = payload.new;
                    return newMsgs;
                } else {
                    // It's a new message (e.g., from child or another therapist session)
                    return [...prevMessages, payload.new];
                }
            });
          }
        )
        .subscribe();

      // Cleanup subscription on unmount or studentId change
      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setMessages([]);
      setLoading(false);
    }
  }, [studentId]); // Re-run effect when studentId changes

  // Scroll to bottom whenever messages array changes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-slate-50 p-6 rounded-lg"> {/* Main container with light background and padding */}
      {/* Messages Display Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 pr-6 rounded-lg bg-white shadow-md mb-4 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50"> {/* Custom scrollbar classes (requires tailwind-scrollbar plugin) */}
        {loading && (
          <div className="flex justify-center items-center h-full">
            <Loader2 size={32} className="animate-spin text-blue-600" />
            <p className="ml-2 text-blue-600">Loading messages...</p>
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 p-4 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        {!loading && !error && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 py-10">
            <MessageSquareText size={48} className="mb-4 text-gray-400" />
            <p className="text-lg font-medium">No messages yet.</p>
            <p className="text-sm">Start a conversation!</p>
          </div>
        )}

        {!loading && messages.map((msg) => (
          <div
            key={msg.id || msg.sent_at} // Use ID if available, fallback to timestamp for optimistic messages
            className={`flex ${msg.sender === "therapist" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs sm:max-w-md p-3 rounded-xl text-white shadow-sm
                ${msg.sender === "therapist" ? "bg-blue-600 rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}
              `}
            >
              <p className="text-sm break-words">{msg.text}</p> {/* Display msg.text */}
              <p className={`text-xs mt-1 ${msg.sender === "therapist" ? "text-blue-100" : "text-gray-500"} text-right`}>
                {new Date(msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Dummy div for scrolling */}
      </div>

      {/* Message Input Area */}
      <form onSubmit={sendMessage} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-md">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { // Allow Shift+Enter for new line, Enter to send
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage(); // Call sendMessage without event object
            }
          }}
          placeholder="Type your message..."
          rows="1"
          className="flex-1 resize-none p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-gray-800"
          style={{ maxHeight: '100px' }} // Prevent textarea from growing too large
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
          disabled={!input.trim()}
          title="Send Message"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}