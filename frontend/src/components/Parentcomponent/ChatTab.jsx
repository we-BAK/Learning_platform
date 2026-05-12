// Fixed: Added useState to the React import line
import { useState, useEffect, useRef } from "react";
import { Send, MessageSquareText } from "lucide-react";

export default function ChatTab({ messages, onSend, therapist }) {
  const messagesEndRef = useRef(null);
  const [input, setInput] = useState(""); // This was causing the error!

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input); 
    setInput("");
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-slate-50 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
          {therapist?.name?.charAt(0) || "T"}
        </div>
        <div>
          <h3 className="font-bold text-slate-800">{therapist?.name}</h3>
          <p className="text-xs text-slate-500">{therapist?.title}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {!messages || messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <MessageSquareText size={48} className="mb-2 opacity-20" />
            <p>No messages yet. Say hello to the therapist!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender_type === "parent" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                  msg.sender_type === "parent"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-slate-800 rounded-bl-none border border-slate-200"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.message}</p>
                <p className={`text-[10px] mt-1 opacity-70 text-right ${msg.sender_type === 'parent' ? 'text-blue-100' : 'text-slate-500'}`}>
                   {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 text-sm outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}