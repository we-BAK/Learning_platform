import React from "react";

const highlight = {
  color: "#2a6ebb",
  fontWeight: "bold",
};

const featureBox = {
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 2px 12px rgba(42,110,187,0.07)",
  padding: "1.2rem 1rem",
  marginBottom: "1.2rem",
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const About = () => (
  <div
    style={{
      padding: "2.5rem 1rem",
      maxWidth: "850px",
      margin: "0 auto",
      background: "linear-gradient(120deg, #f9fafd 60%, #e3f0ff 100%)",
      borderRadius: "20px",
      boxShadow: "0 6px 32px rgba(42,110,187,0.10)",
    }}
  >
    <h1 style={{ color: "#2a6ebb", marginBottom: "0.5rem", fontSize: "2.5rem", fontWeight: 800, letterSpacing: "1px" }}>
      Empowering Connections,<br />Enabling Progress
    </h1>
    <p style={{ fontSize: "1.2rem", color: "#333", marginBottom: "0.7rem" }}>
      <span style={highlight}>Welcome!</span> Our platform is your partner in bridging the gap between parents and therapists. We make collaboration <span style={highlight}>seamless</span>, <span style={highlight}>supportive</span>, and <span style={highlight}>effective</span>—because every child deserves the best care.
    </p>
    <p style={{ fontSize: "1.13rem", color: "#444", marginBottom: "1.5rem" }}>
      Whether you’re a parent seeking guidance or a therapist supporting families, our features are crafted to save you time, reduce stress, and keep everyone focused on what matters most:{" "}
      <span style={highlight}>growth and well-being</span>.
    </p>
    <div>
      <div style={featureBox}>
        <span role="img" aria-label="chat" style={{ fontSize: "2rem" }}>💬</span>
        <div>
          <strong style={highlight}>Real-time Messaging:</strong> <br />
          Secure, instant chat with read receipts and typing indicators—so you’re always connected.
        </div>
      </div>
      <div style={featureBox}>
        <span role="img" aria-label="calendar" style={{ fontSize: "2rem" }}>📅</span>
        <div>
          <strong style={highlight}>Session Scheduling:</strong> <br />
          Effortless calendar to book, confirm, and get reminders for therapy sessions—never miss a moment.
        </div>
      </div>
      <div style={featureBox}>
        <span role="img" aria-label="chart" style={{ fontSize: "2rem" }}>📈</span>
        <div>
          <strong style={highlight}>Progress Reports:</strong> <br />
          Visual, detailed updates to keep parents informed and therapists organized—track every milestone.
        </div>
      </div>
      <div style={featureBox}>
        <span role="img" aria-label="books" style={{ fontSize: "2rem" }}>📚</span>
        <div>
          <strong style={highlight}>Resource Library:</strong> <br />
          Curated educational materials and exercises to support therapy at home, anytime.
        </div>
      </div>
      <div style={featureBox}>
        <span role="img" aria-label="lock" style={{ fontSize: "2rem" }}>🔒</span>
        <div>
          <strong style={highlight}>Secure & Private:</strong> <br />
          Your privacy is our priority. All data and conversations are protected with advanced, HIPAA-compliant encryption.
        </div>
      </div>
      <div style={featureBox}>
        <span role="img" aria-label="target" style={{ fontSize: "2rem" }}>🎯</span>
        <div>
          <strong style={highlight}>Goal Tracking:</strong> <br />
          Set, monitor, and celebrate goals together with easy-to-understand progress indicators.
        </div>
      </div>
    </div>
    <p style={{ fontSize: "1.15rem", color: "#2a6ebb", marginTop: "2rem", fontWeight: 600 }}>
      <span style={{ fontSize: "1.3rem" }}>🌟</span> We’re committed to building a supportive, easy-to-use environment where families and professionals can connect, share, and succeed—together.
    </p>
    <p style={{ fontWeight: "bold", color: "#2a6ebb", fontSize: "1.1rem", marginTop: "0.5rem" }}>
      Thank you for letting us be part of your journey!
    </p>
  </div>
);

export default About;
