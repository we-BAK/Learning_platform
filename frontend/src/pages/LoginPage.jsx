import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../lib/supabaseClient";
import logo from "../assets/favs/logo.png"; 
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please provide both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setIsLoading(false);
        return;
      }

      const userId = authData.user.id;
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role, is_active")
        .eq("id", userId)
        .single();

      if (profileError || !profile) {
        setError("Failed to retrieve user profile.");
        setIsLoading(false);
        return;
      }

      if (!profile.is_active) {
        await supabase.auth.signOut();
        setError("Your account is inactive. Please contact the administrator.");
        setIsLoading(false);
        return;
      }

      switch (profile.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "manager":
          navigate("/manager/dashboard");
          break;
        case "therapist":
          navigate("/therapist");
          break;
        case "parent":
          navigate("/parent");
          break;
        default:
          await supabase.auth.signOut();
          setError("Unknown role. Please contact support.");
      }

    } catch (err) {
      setError("Unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F9FF]">
      <div className="flex flex-col md:flex-row items-center shadow-lg rounded-3xl bg-white w-full max-w-5xl p-6 md:p-0">
        
        {/* Left - Illustration */}
        <div className="md:w-1/2 p-6 hidden md:flex flex-col items-center justify-center bg-[#E3F2FD] rounded-l-3xl">
          <img
            src="/public/assets/login.png"
            alt="Support illustration"
            className="w-80 h-auto"
          />
          <h2 className="text-2xl font-bold text-blue-700 mt-4 text-center">
            Empowering Special Journeys
          </h2>
          <p className="text-blue-600 text-sm mt-2 text-center">
            Helping families and therapists collaborate for a brighter future.
          </p>
        </div>

        {/* Right - Login Form */}
        <div className="md:w-1/2 w-full p-8">
          <div className="flex flex-col items-center">
            <img
              src={logo}
              alt="Site logo"
              className="w-16 h-16 mb-3"
            />
            <h1 className="text-3xl font-bold text-indigo-700">Welcome Back</h1>
            <p className="text-gray-500 mb-6">Please log in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm pr-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 text-sm"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 text-white font-semibold rounded-xl transition-all duration-300 ${
                isLoading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link to="/registration" className="text-indigo-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
