import React, { useState } from "react";

// --- Enhanced Styles for a More Attractive Look ---
const profileStyles = {
  maxWidth: "440px",
  margin: "3rem auto",
  padding: "2.8rem 2.2rem 2.2rem 2.2rem",
  borderRadius: "32px",
  boxShadow: "0 12px 40px 0 rgba(108,99,255,0.22)",
  background: "linear-gradient(135deg, #f8f9ff 0%, #e6e7ff 100%)",
  textAlign: "center",
  fontFamily: "Segoe UI, sans-serif",
  position: "relative",
  overflow: "hidden",
  border: "2px solid #e0e7ff"
};

const avatarStyles = {
  width: "130px",
  height: "130px",
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "1.2rem",
  border: "6px solid #6c63ff",
  background: "#f3f3f3",
  boxShadow: "0 4px 18px rgba(108,99,255,0.18)",
  zIndex: 2,
  position: "relative"
};

const gradientRing = {
  position: "absolute",
  top: "35px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "160px",
  height: "160px",
  borderRadius: "50%",
  background: "conic-gradient(from 90deg at 50% 50%, #6c63ff 0%, #a084ee 100%)",
  opacity: 0.13,
  zIndex: 1
};

const contactListStyles = {
  listStyle: "none",
  padding: 0,
  margin: "1.2rem 0"
};

const contactItemStyles = {
  margin: "0.7rem 0",
  fontSize: "1.08rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem"
};

const iconStyle = {
  fontSize: "1.2rem",
  color: "#6c63ff"
};

const messageBoxStyles = {
  marginTop: "2.8rem",
  padding: "1.5rem 1.2rem",
  border: "2px solid #e0e7ff",
  borderRadius: "18px",
  background: "linear-gradient(135deg, #f8f9ff 0%, #e6e7ff 100%)",
  textAlign: "left",
  boxShadow: "0 4px 18px rgba(108,99,255,0.10)"
};

const messageInputStyles = {
  width: "100%",
  padding: "0.8rem",
  borderRadius: "8px",
  border: "2px solid #bfc6ff",
  marginBottom: "0.8rem",
  fontSize: "1.05rem",
  background: "#f4f6ff",
  resize: "none"
};

const buttonStyles = {
  background: "linear-gradient(90deg, #6c63ff 60%, #8f7cff 100%)",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "0.7rem 2.2rem",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: "1.08rem",
  boxShadow: "0 2px 10px rgba(108,99,255,0.13)",
  transition: "background 0.2s"
};

const badgeStyles = {
  display: "inline-block",
  background: "linear-gradient(90deg, #e0e7ff 60%, #f3f3ff 100%)",
  color: "#6c63ff",
  borderRadius: "10px",
  padding: "0.3rem 1.1rem",
  fontSize: "1.05rem",
  fontWeight: 600,
  marginBottom: "1.1rem",
  letterSpacing: "0.5px",
  boxShadow: "0 1px 6px #c7d2fe33"
};

const TherapistProfileCard = ({ name, specialty, bio, email, phone, telegram, image }) => {
  return (
    <div style={profileStyles}>
      {/* Decorative gradient ring */}
      <div style={gradientRing} />
      <img
        src={image}
        alt={name}
        style={avatarStyles}
      />
      <div style={badgeStyles}>{specialty}</div>
      <h2 style={{ color: "#6c63ff", marginBottom: "0.5rem", fontWeight: 800, fontSize: "2rem" }}>{name}</h2>
      <p style={{ color: "#555", marginBottom: "1.5rem", fontSize: "1.13rem", lineHeight: 1.6 }}>{bio}</p>
      <div className="contact-info">
        <h3 style={{ color: "#6c63ff", marginBottom: "0.5rem", fontWeight: 700, fontSize: "1.15rem" }}>Contact Information</h3>
        <ul style={contactListStyles}>
          <li style={contactItemStyles}>
            <span style={iconStyle}>📧</span>
            <strong>Email:</strong>
            <a href={`mailto:${email}`} style={{ color: "#6c63ff", textDecoration: "underline" }}>{email}</a>
          </li>
          <li style={contactItemStyles}>
            <span style={iconStyle}>📞</span>
            <strong>Phone:</strong>
            <a href={`tel:${phone}`} style={{ color: "#6c63ff", textDecoration: "underline" }}>{phone}</a>
          </li>
          <li style={contactItemStyles}>
            <span style={iconStyle}>💬</span>
            <strong>Telegram:</strong>
            <a href={`https://t.me/${telegram}`} target="_blank" rel="noopener noreferrer" style={{ color: "#6c63ff", textDecoration: "underline" }}>
              @{telegram}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Messaging system component
function TherapistMessaging() {
  const [messages, setMessages] = useState([
    { from: "therapist", text: "👋 Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    // Simulate therapist reply
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { from: "therapist", text: "😊 Thank you for your message. I'll get back to you soon." }
      ]);
    }, 1200);
  };

  return (
    <div style={messageBoxStyles}>
      <h3 style={{ color: "#6c63ff", fontWeight: 700, fontSize: "1.15rem" }}>Write to Therapist</h3>
      <div style={{
        maxHeight: "180px",
        overflowY: "auto",
        marginBottom: "1.1rem",
        background: "#f4f6ff",
        borderRadius: "10px",
        padding: "0.8rem",
        border: "1.5px solid #e0e7ff"
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            margin: "0.6rem 0",
            textAlign: msg.from === "user" ? "right" : "left",
            display: "flex",
            flexDirection: msg.from === "user" ? "row-reverse" : "row"
          }}>
            <span
              style={{
                display: "inline-block",
                background: msg.from === "user"
                  ? "linear-gradient(90deg, #e0e7ff 60%, #c7d2fe 100%)"
                  : "linear-gradient(90deg, #f3f3f3 60%, #e0e7ff 100%)",
                color: "#333",
                borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                padding: "0.7rem 1.2rem",
                maxWidth: "80%",
                fontSize: "1.07rem",
                boxShadow: msg.from === "user"
                  ? "0 2px 8px #c7d2fe55"
                  : "0 1px 4px #e0e7ff55",
                border: msg.from === "user"
                  ? "1.5px solid #bfc6ff"
                  : "1.5px solid #e0e7ff"
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <textarea
        style={messageInputStyles}
        rows={2}
        placeholder="Type your message..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button
        style={buttonStyles}
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}

export default function TherapistProfile() {
  return (
    <>
      <TherapistProfileCard
        name="Dr Jane Smith"
        specialty="Child Therapist"
        bio="Dr. Smith specializes in child psychology and has over 10 years of experience helping children and families."
        email="jane.smith@email.com"
        phone="+1234567890"
        telegram="janesmith"
        image="https://randomuser.me/api/portraits/women/44.jpg"
      />
      <TherapistMessaging />
    </>
  );
}
