import React, { useState } from "react";
import { Input } from "../Ui/Input";
import { Button } from "../Ui/Button";
import { Card, CardContent } from "../Ui/Card";
import { Label } from "../Ui/Label";

export default function AccountSettings() {
  const [formData, setFormData] = useState({
    fullName: "Therapist A",
    email: "therapist@example.com",
    role: "Therapist",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setMessage("✅ Changes saved! (Not connected to backend)");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fff" }}>
      <div className="w-full max-w-2xl">
        <Card className="rounded-3xl shadow-2xl border-0" style={{ backgroundColor: "#eff6ff" }}>
          <CardContent className="pt-8 pb-8 px-8 space-y-8">
            {/* Avatar and Title */}
            <div className="flex items-center gap-5 mb-2">
              <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center shadow-lg border-4 border-white">
                <span className="text-3xl font-bold text-blue-700">
                  {formData.fullName[0]}
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-blue-800 tracking-tight">
                  Account Settings
                </h2>
                <p className="text-blue-500 text-base font-medium">
                  {formData.role}
                </p>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <Label
                htmlFor="fullName"
                className="font-extrabold"
                style={{ color: "#000000" }}
              >
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-lg text-purple-400 font-bold bg-blue-50"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="font-extrabold"
                style={{ color: "#000000" }}
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-lg text-purple-400 font-bold bg-blue-50"
                placeholder="Enter your email"
                type="email"
              />
            </div>

            {/* Role (read-only) */}
            <div className="space-y-1">
              <Label
                htmlFor="role"
                className="font-extrabold"
                style={{ color: "#000000" }}
              >
                Role
              </Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                readOnly
                className="bg-blue-100 border-blue-200 cursor-not-allowed rounded-lg text-purple-400 font-bold"
              />
            </div>

            {/* Change Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label
                  htmlFor="password"
                  className="font-extrabold"
                  style={{ color: "#000000" }}
                >
                  New Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-lg text-purple-400 font-bold bg-blue-50"
                  placeholder="New password"
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="confirmPassword"
                  className="font-extrabold"
                  style={{ color: "#000000" }}
                >
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border-blue-200 focus:border-blue-400 focus:ring-blue-100 rounded-lg text-purple-400 font-bold bg-blue-50"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            {/* Save button and message */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-8 py-2 rounded-lg shadow hover:from-blue-600 hover:to-blue-800 transition"
              >
                Save Changes
              </Button>
            </div>
            {message && (
              <div className="text-green-600 text-center font-medium">
                {message}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
