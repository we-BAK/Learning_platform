import React from "react";

const pageStyle = {
  minHeight: "100vh",
  padding: "2rem",
  background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
  fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
};

const cardStyle = {
  background: "rgba(255,255,255,0.85)",
  borderRadius: "20px",
  boxShadow: "0 8px 32px rgba(44,62,80,0.18)",
  padding: "2.5rem",
  margin: "2rem auto",
  maxWidth: "600px",
  textAlign: "center",
  backdropFilter: "blur(6px)"
};

const iconStyle = {
  fontSize: "3rem",
  color: "#6c63ff",
  marginBottom: "1.2rem",
  animation: "bounce 1.5s infinite"
};

const chartPlaceholder = {
  width: "100%",
  height: "180px",
  background: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
  borderRadius: "14px",
  margin: "1.5rem 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#6c63ff",
  fontWeight: "bold",
  fontSize: "1.2rem",
  letterSpacing: "1px",
  boxShadow: "0 2px 12px rgba(108,99,255,0.08)"
};

const statsList = {
  listStyle: "none",
  padding: 0,
  color: "#444",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginTop: "1rem"
};

const statItem = {
  background: "rgba(108,99,255,0.08)",
  borderRadius: "10px",
  padding: "0.8rem 1.2rem",
  transition: "transform 0.2s, box-shadow 0.2s",
  cursor: "pointer"
};

const progressBarContainer = {
  background: "#e0e7ff",
  borderRadius: "8px",
  height: "16px",
  margin: "1rem 0",
  width: "100%",
  overflow: "hidden"
};

const progressBar = {
  background: "linear-gradient(90deg, #6c63ff 60%, #a1c4fd 100%)",
  height: "100%",
  width: "80%",
  borderRadius: "8px",
  transition: "width 0.6s"
};

const Reports = () => {
  return (
    <div style={pageStyle}>
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          li:hover {
            transform: scale(1.04);
            box-shadow: 0 4px 16px rgba(108,99,255,0.12);
          }
        `}
      </style>
      <div style={cardStyle}>
        <div style={iconStyle}>📊</div>
        <h1 style={{ color: "#6c63ff", marginBottom: "0.5rem", letterSpacing: "1px" }}>Reports</h1>
        <div style={chartPlaceholder}>
          {/* Replace this with a real chart component */}
          Chart Visualization
        </div>
        <div style={progressBarContainer}>
          <div style={progressBar}></div>
        </div>
        <div style={{ textAlign: "left", marginTop: "2rem" }}>
          <h3 style={{ color: "#6c63ff" }}>Quick Stats</h3>
          <ul style={statsList}>
            <li style={statItem}>✅ <strong>Sessions Completed:</strong> 24</li>
            <li style={statItem}>📅 <strong>Upcoming Sessions:</strong> 3</li>
            <li style={statItem}>⭐ <strong>Average Rating:</strong> 4.8/5</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reports;
