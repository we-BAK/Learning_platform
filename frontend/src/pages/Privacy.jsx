import React from "react";

const sectionStyle = {
  marginBottom: "2rem",
  padding: "1.5rem",
  background: "#f9f9f9",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
};

const headingStyle = {
  color: "#2a7ae2",
  marginBottom: "0.5rem",
};

const Privacy = () => (
  <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
    <h1 style={{ color: "#1a237e", textAlign: "center" }}>🔒 Privacy Policy</h1>
    <p style={{ textAlign: "center", color: "#555" }}>
      <strong>Last updated:</strong> May 31, 2025
    </p>
    <div style={sectionStyle}>
      <h2 style={headingStyle}>🧑‍💻 Our Commitment</h2>
      <p>
        We care about your privacy and the security of your learning journey. This policy explains what we collect, how we use it, and how we keep it safe.
      </p>
    </div>

    <div style={sectionStyle}>
      <h2 style={headingStyle}>📋 What Information We Collect</h2>
      <ul>
        <li>
          <strong>Account Info:</strong> Name, email, password, and optional profile details.
        </li>
        <li>
          <strong>Learning Activity:</strong> Courses, progress, quizzes, and discussions.
        </li>
        <li>
          <strong>Technical Data:</strong> Device, browser, IP, and usage patterns.
        </li>
        <li>
          <strong>Cookies & Analytics:</strong> To remember preferences and improve our site.
        </li>
      </ul>
    </div>

    <div style={sectionStyle}>
      <h2 style={headingStyle}>💡 How We Use Your Data</h2>
      <ul>
        <li>Manage your account and personalize your experience</li>
        <li>Deliver courses and track your progress</li>
        <li>Send important updates and support</li>
        <li>Analyze usage to improve our platform</li>
        <li>Prevent fraud and unauthorized access</li>
      </ul>
    </div>

    <div style={sectionStyle}>
      <h2 style={headingStyle}>🛡️ Security Practices</h2>
      <ul>
        <li>
          <strong>Encryption:</strong> All sensitive data is encrypted in transit and at rest.
        </li>
        <li>
          <strong>Access Controls:</strong> Only authorized staff can access your data.
        </li>
        <li>
          <strong>Regular Audits:</strong> We review our systems for vulnerabilities.
        </li>
        <li>
          <strong>Data Minimization:</strong> We only collect what’s necessary.
        </li>
      </ul>
      <p>
        <em>
          Tip: Use a strong password and keep your login details confidential!
        </em>
      </p>
    </div>

    <div style={sectionStyle}>
      <h2 style={headingStyle}>🤝 Third-Party Services</h2>
      <p>
        We use trusted partners for payments, analytics, and communication. They must protect your data and use it only for agreed purposes.
      </p>
    </div>

    <div style={sectionStyle}>
      <h2 style={headingStyle}>📝 Your Rights & Choices</h2>
      <ul>
        <li>Update or delete your account anytime in your profile</li>
        <li>Request a copy or erasure of your data by contacting support</li>
        <li>Opt out of marketing emails via the unsubscribe link</li>
        <li>Disable cookies in your browser (some features may not work)</li>
      </ul>
    </div>

    <div style={sectionStyle}>
      <h2 style={headingStyle}>👦 Children’s Privacy</h2>
      <p>
        Our platform is for users 13 and older. We do not knowingly collect data from children under 13. Contact us if you believe a child has provided information.
      </p>
    </div>

    <div style={sectionStyle}>
      <h2 style={headingStyle}>🔄 Policy Updates</h2>
      <p>
        We may update this policy as our practices change. We’ll notify you of significant changes by email or on this page.
      </p>
    </div>

    <div style={sectionStyle}>
      <h2 style={headingStyle}>📧 Contact Us</h2>
      <p>
        Questions? Email us at <a href="mailto:support@example.com">support@example.com</a>
      </p>
    </div>
  </div>
);

export default Privacy;
