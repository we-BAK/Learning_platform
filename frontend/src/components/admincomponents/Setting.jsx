import React, { useState } from "react";

const AdminAccountSettings = () => {
  // Profile state
  const [profile, setProfile] = useState({
    fullName: "Admin User",
    email: "admin@autismplatform.org",
    phone: "+251900000000",
  });

  const [profileMessage, setProfileMessage] = useState(null);

  // Password change state
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmNewPass: "",
  });

  const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" });

  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setProfileMessage("✅ Profile updated successfully.");
    setTimeout(() => setProfileMessage(null), 3000);
  };

  // Handle password form submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirmNewPass) {
      setPasswordMessage({ type: "error", text: "❌ New passwords do not match." });
    } else if (passwords.newPass.length < 6) {
      setPasswordMessage({ type: "error", text: "❌ New password must be at least 6 characters." });
    } else {
      setPasswordMessage({ type: "success", text: "✅ Password changed successfully." });
    }

    setTimeout(() => setPasswordMessage({ type: "", text: "" }), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-medium mb-4">👤 Profile Information</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={profile.email}
                readOnly
                className="w-full mt-1 px-4 py-2 bg-gray-100 border rounded-md cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Phone Number</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
            {profileMessage && (
              <p className="text-green-600 mt-2">{profileMessage}</p>
            )}
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-medium mb-4">🔒 Change Password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">Current Password</label>
              <input
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">New Password</label>
              <input
                type="password"
                value={passwords.newPass}
                onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Confirm New Password</label>
              <input
                type="password"
                value={passwords.confirmNewPass}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirmNewPass: e.target.value })
                }
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Change Password
            </button>
            {passwordMessage.text && (
              <p
                className={`mt-2 ${
                  passwordMessage.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {passwordMessage.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAccountSettings;
