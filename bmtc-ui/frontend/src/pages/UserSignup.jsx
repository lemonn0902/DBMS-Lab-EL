import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, User, Phone, Loader2 } from "lucide-react";

export default function UserSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/user/signup", { 
        name,
        email, 
        password,
        phone
      });

      alert("User account created successfully! Please login.");
      navigate("/login");
      
    } catch (err) {
      console.error("Signup error:", err);
      console.error("Response data:", err.response?.data);
      
      // Get the detailed error message
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.message || 
                          err.message || 
                          "Signup failed. Please try again.";
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-white">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 bg-green-600 text-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
            <UserPlus className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">Create User Account</h2>
          <p className="mt-2 text-sm text-gray-500">Join BMTC Fleet Management System</p>
        </div>

        <div className="mt-8 space-y-5">
          <div className="space-y-4">
            <div className="relative">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  className="appearance-none rounded-xl relative block w-full px-10 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all sm:text-sm"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  className="appearance-none rounded-xl relative block w-full px-10 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all sm:text-sm"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-1 block">Phone (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  className="appearance-none rounded-xl relative block w-full px-10 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all sm:text-sm"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  className="appearance-none rounded-xl relative block w-full px-10 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && signup()}
                />
              </div>
            </div>
          </div>

          <button
            onClick={signup}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
