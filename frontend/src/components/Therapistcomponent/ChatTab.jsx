import { useState, useEffect, useRef } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import supabase from "@/lib/supabaseClient";
import { Send, MessageSquareText, Loader2, AlertCircle } from "lucide-react";

export default function ChatTab({ studentId }) {
  const session = useSession();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 1. Fetch History
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
      .eq("child_id", studentId)
      .order("created_at", { ascending: true });

    if (fetchError) {
      console.error("Error fetching messages:", fetchError.message);
      setError("Failed to load messages.");
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  // 2. Send Message logic
  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    
    // Check for session, input, and student selection
    if (!input.trim() || !studentId || !session?.user?.id) {
      console.warn("Missing requirements to send message");
      return;
    }

    const messagePayload = {
      child_id: studentId,
      sender_id: session.user.id, // THE FIX: Database usually requires UUID
      sender_type: "therapist", 
      message: input.trim(), 
    };

    const { error: sendError } = await supabase
      .from("messages")
      .insert([messagePayload]); // Wrapped in array for Supabase best practice

    if (sendError) {
      console.error("Error sending message:", sendError.message);
      setError(`Send failed: ${sendError.message}`);
    } else {
      setInput(""); // Clear on success
      setError(null);
    }
  };

  // 3. Setup Realtime Listener
  useEffect(() => {
    if (studentId) {
      fetchMessages();

      const channel = supabase
        .channel(`chat_room_${studentId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `child_id=eq.${studentId}`
          },
          (payload) => {
            setMessages((prevMessages) => {
                // Avoid duplicates
                if (prevMessages.find(msg => msg.id === payload.new.id)) return prevMessages;
                return [...prevMessages, payload.new];
            });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setMessages([]);
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-slate-50 p-4 rounded-lg">
      {/* Error Banner */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-2 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* Messages Display Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-xl bg-white shadow-inner mb-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 size={32} className="animate-spin text-blue-600" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-300">
            <MessageSquareText size={48} className="mb-2 opacity-20" />
            <p className="font-medium">No messages with this student yet.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender_type === "therapist" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                  msg.sender_type === "therapist" 
                    ? "bg-blue-600 text-white rounded-br-none" 
                    : "bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.message}</p>
                <p className={`text-[10px] mt-1 opacity-70 text-right`}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={sendMessage} className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your reply..."
          className="flex-1 p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
        />
        <button
          type="submit"
          disabled={!input.trim() || !session}
          className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 shadow-md shadow-blue-100"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}