import { useState, useEffect, useRef } from "react"; // Added useRef and useEffect for auto-scrolling
import { Send, MessageSquareText } from "lucide-react"; // Added MessageSquareText for empty state icon

export default function ChatTab({ messages, onSend, therapist }) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages array changes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendClick = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div
      className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden h-full" // Changed from fixed height to h-full to fill parent, using rounded-2xl and shadow-lg for fancier look
      // You might need to adjust the parent container's height if this h-full doesn't work as expected
      // For example, if the parent is flex-1 min-h-0 and has a specific height.
      // If you need a specific calc height, you can re-add style={{ height: "calc(100vh - Xpx)" }} to its parent div.
    >
      <header className="p-6 border-b border-blue-200 flex-shrink-0 bg-white"> {/* Adjusted border color */}
        <h1 className="text-2xl font-extrabold text-blue-900">Chat with {therapist.name}</h1> {/* Bolder text, dark blue */}
      </header>

      {/* Messages Display Area */}
      <div className="flex-1 overflow-y-auto p-6 pr-8 space-y-4 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50"> {/* Increased horizontal padding for scrollbar, consistent space-y, custom scrollbar */}
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 py-10">
            <MessageSquareText size={48} className="mb-4 text-gray-400" />
            <p className="text-lg font-medium">No messages yet.</p>
            <p className="text-sm">Start a conversation!</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-3 ${
                msg.sender === "parent" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "therapist" && (
                <div className="w-10 h-10 rounded-full bg-blue-300 text-blue-800 flex items-center justify-center font-bold flex-shrink-0 border-2 border-blue-400"> {/* Adjusted avatar colors to blue theme, added border */}
                  {therapist.name?.charAt(0) || "T"} {/* Use therapist's initial, fallback to 'T' */}
                </div>
              )}
              <div
                className={`max-w-lg p-4 rounded-xl shadow-sm ${ // More rounded, added shadow
                  msg.sender === "parent"
                    ? "bg-blue-600 text-white rounded-br-none" // Blue for parent, with one corner less rounded
                    : "bg-blue-100 text-blue-900 rounded-bl-none" // Light blue for therapist, with one corner less rounded, dark blue text
                }`}
              >
                <p className="text-sm break-words">{msg.text}</p> {/* Ensured text is small and wraps */}
                <p className={`text-xs mt-2 ${msg.sender === "parent" ? "text-blue-100" : "text-gray-600"} text-right`}> {/* Adjusted timestamp color and alignment */}
                  {new Date(msg.sent_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} /> {/* Dummy div for scrolling */}
      </div>

      {/* Message Input Area */}
      <div className="p-6 bg-white border-t border-blue-200 flex-shrink-0"> {/* Adjusted border color */}
        <div className="flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-xl p-2 shadow-inner"> {/* Light blue background, blue border, inner shadow */}
          <input
            type="text"
            className="flex-1 bg-transparent px-4 py-2 outline-none text-gray-800 placeholder-blue-400 focus:ring-2 focus:ring-blue-300 transition-all duration-200" // Adjusted placeholder, added focus ring
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => { // Allow Shift+Enter for new line, Enter to send
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendClick();
              }
            }}
          />
          <button
            onClick={handleSendClick}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-md flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed" // Rounded button, blue, shadow, disabled states
            disabled={!message.trim()} // Disable if input is empty
            title="Send Message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}