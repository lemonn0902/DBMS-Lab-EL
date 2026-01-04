import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";

export default function Login() {
  const [loginType, setLoginType] = useState("admin"); // "admin" or "user"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      const endpoint = loginType === "admin" 
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/user/login";

      const res = await axios.post(endpoint, { 
        email, 
        password 
      });

      // Store the token for the ProtectedRoute
      localStorage.setItem("token", res.data.token);

      // Store user info for the Sidebar display
      const userPayload = {
        name: res.data.user?.name || (loginType === "admin" ? "Admin User" : "User"),
        role: res.data.user?.role || loginType,
        email: email
      };
      localStorage.setItem("user", JSON.stringify(userPayload));

      // Navigate to root (which renders Dashboard)
      window.location.href = "/"; 
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-white">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
            <LogIn className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">BMTC</h2>
          <p className="mt-2 text-sm text-gray-500">Fleet Management System</p>
        </div>

        {/* Login Type Tabs */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => {
              setLoginType("admin");
              setEmail("");
              setPassword("");
            }}
            className={`flex-1 py-2 px-4 rounded-md font-semibold text-sm transition-all ${
              loginType === "admin"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Admin Login
          </button>
          <button
            onClick={() => {
              setLoginType("user");
              setEmail("");
              setPassword("");
            }}
            className={`flex-1 py-2 px-4 rounded-md font-semibold text-sm transition-all ${
              loginType === "user"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            User Login
          </button>
        </div>

        <div className="mt-8 space-y-5">
          <div className="space-y-4">
            <div className="relative">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  className="appearance-none rounded-xl relative block w-full px-10 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all sm:text-sm"
                  placeholder={loginType === "admin" ? "admin@bmtc.com" : "user@example.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="relative">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  required
                  className="appearance-none rounded-xl relative block w-full px-10 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && login()}
                />
              </div>
            </div>
          </div>

          <button
            onClick={login}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              `Sign In as ${loginType === "admin" ? "Admin" : "User"}`
            )}
          </button>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              New to the system?{" "}
              <Link to={loginType === "admin" ? "/signup" : "/user-signup"} className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}