import React from "react";

const cards = [
  {
    id: 1,
    label: "I want water",
    image: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
  },
  {
    id: 2,
    label: "I feel happy",
    image: "https://cdn-icons-png.flaticon.com/512/742/742751.png",
  },
  {
    id: 3,
    label: "I feel sad",
    image: "https://cdn-icons-png.flaticon.com/512/742/742774.png",
  },
  {
    id: 4,
    label: "I want to play",
    image: "https://cdn-icons-png.flaticon.com/512/2282/2282900.png",
  },
  {
    id: 5,
    label: "I’m hungry",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
  },
];

export default function App() {
  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", textAlign: "center", background: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Tap a Picture to Speak</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 20,
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {cards.map(({ id, label, image }) => (
          <div
            key={id}
            onClick={() => speakText(label)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" ? speakText(label) : null)}
            style={{
              cursor: "pointer",
              backgroundColor: "#fff",
              borderRadius: 12,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              padding: 10,
              width: 160,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              userSelect: "none",
            }}
          >
            <img
              src={image}
              alt={label}
              style={{ width: 96, height: 96, objectFit: "contain", marginBottom: 12 }}
              draggable={false}
            />
            <div style={{ fontWeight: "600", fontSize: 16, color: "#333" }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
