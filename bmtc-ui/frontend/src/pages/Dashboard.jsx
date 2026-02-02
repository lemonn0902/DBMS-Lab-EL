import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext.jsx"
import {
  Bus,
  Users,
  Map,
  Clock,
  FileText,
  Bell,
  UserCog,
  TrendingUp,
  Shield,
  Activity,
  Route,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function Dashboard() {
  const { darkMode } = useTheme();
  const [user, setUser] = useState({ name: "User", role: "user" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data");
      }
    }
  }, []);

  const isAdmin = user.role === "admin";

  /* ---------------- KPI VISIBILITY (ADMIN ONLY) ---------------- */
  const kpiRef = useRef(null);
  const [showKpis, setShowKpis] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowKpis(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (kpiRef.current) observer.observe(kpiRef.current);
    return () => observer.disconnect();
  }, [isAdmin]);

  /* ---------------- DATA (ADMIN ONLY) ---------------- */
  const stats = [
    { label: "Active Buses", value: "118", change: "+2%", icon: Activity, gradient: "from-blue-500 to-blue-600" },
    { label: "On-time Performance", value: "94.2%", change: "+1.5%", icon: TrendingUp, gradient: "from-green-500 to-green-600" },
    { label: "Active Drivers", value: "156", change: "+4%", icon: Users, gradient: "from-purple-500 to-purple-600" },
    { label: "Daily Passengers", value: "5.2M", change: "+3.2%", icon: Route, gradient: "from-orange-500 to-orange-600" },
    { label: "Avg. Speed", value: "32 km/h", change: "-0.5%", icon: Shield, gradient: "from-red-500 to-red-600" },
    { label: "Fleet Health", value: "92%", change: "+1.8%", icon: Bus, gradient: "from-cyan-500 to-cyan-600" }
  ];

  // Chart data
  const performanceData = [
    { name: "Mon", performance: 92, target: 95 },
    { name: "Tue", performance: 94, target: 95 },
    { name: "Wed", performance: 91, target: 95 },
    { name: "Thu", performance: 96, target: 95 },
    { name: "Fri", performance: 95, target: 95 },
    { name: "Sat", performance: 93, target: 95 },
    { name: "Sun", performance: 94, target: 95 }
  ];

  const fleetStatusData = [
    { name: "Active", value: 118, color: "#10b981" },
    { name: "In Maintenance", value: 15, color: "#f59e0b" },
    { name: "Inactive", value: 7, color: "#ef4444" }
  ];

  const recentActivity = [
    { time: "10:30 AM", desc: "Route #45 schedule updated", type: "Update", icon: Route },
    { time: "09:15 AM", desc: "New complaint registered", type: "Complaint", icon: FileText },
    { time: "Yesterday", desc: "Bus maintenance completed", type: "Maintenance", icon: Bus },
    { time: "Nov 12", desc: "Driver performance report generated", type: "Report", icon: Users },
    { time: "Nov 11", desc: "New conductor registered", type: "Personnel", icon: UserCog },
    { time: "Nov 10", desc: "Fleet inspection passed", type: "Success", icon: Shield }
  ];

  const activityColor = (type) => {
    switch (type) {
      case "Update": return "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300";
      case "Complaint": return "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300";
      case "Maintenance": return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
      case "Report": return "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300";
      case "Personnel": return "bg-cyan-100 text-cyan-600 dark:bg-cyan-900 dark:text-cyan-300";
      default: return "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300";
    }
  };

  if (!isAdmin) {
    // USER-FRIENDLY DASHBOARD
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* HEADER */}
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-b'}`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>BMTC Transit</h1>
            <div className="flex gap-4 items-center">
              <button className={`relative p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition`}>
                <Bell className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  2
                </span>
              </button>
              <div className={`flex items-center gap-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} px-4 py-2 rounded-lg`}>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-semibold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{user.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-600 to-blue-700'} text-white py-16`}>
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to BMTC Transit</h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Your gateway to Bangalore's comprehensive public transportation system. 
              Explore routes, report issues, and help us serve you better.
            </p>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          
          {/* QUICK ACTION CARDS */}
          <div className="mb-16">
            <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              What would you like to do?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* VIEW ROUTES CARD */}
              <Link
                to="/routes"
                className={`group ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-lg'} rounded-2xl p-8 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300 shadow-sm`}
              >
                <div className="mb-6">
                  <div className="h-14 w-14 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Map className="h-7 w-7 text-blue-600" />
                  </div>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Browse Routes
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  Explore all available bus routes across Bangalore with detailed stops and timings.
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                  View Routes
                  <ArrowRight className="h-5 w-5 ml-2" />
                </div>
              </Link>

              {/* FILE COMPLAINT CARD */}
              <Link
                to="/add-complaint"
                className={`group ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-lg'} rounded-2xl p-8 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300 shadow-sm`}
              >
                <div className="mb-6">
                  <div className="h-14 w-14 rounded-xl bg-orange-100 dark:bg-orange-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="h-7 w-7 text-orange-600" />
                  </div>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  File a Complaint
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  Report issues with buses, drivers, or service quality. Help us improve transit.
                </p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                  Report Issue
                  <ArrowRight className="h-5 w-5 ml-2" />
                </div>
              </Link>

              {/* REPORT ACCIDENT CARD */}
              <Link
                to="/add-accident"
                className={`group ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-lg'} rounded-2xl p-8 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300 shadow-sm`}
              >
                <div className="mb-6">
                  <div className="h-14 w-14 rounded-xl bg-red-100 dark:bg-red-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <AlertTriangle className="h-7 w-7 text-red-600" />
                  </div>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Report Accident
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  Quickly report any accidents or safety incidents for immediate assistance.
                </p>
                <div className="flex items-center text-red-600 font-semibold group-hover:gap-2 transition-all">
                  Report Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </div>
              </Link>
            </div>
          </div>

          {/* INFO SECTION */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'} border rounded-2xl p-8`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              About BMTC Transit
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-4`}>
              Bangalore Metropolitan Transport Corporation (BMTC) operates one of the largest bus networks in India, 
              serving millions of commuters daily. With our user-friendly platform, you can easily explore routes, 
              provide feedback, and help us maintain the highest standards of public transportation service.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div>
                <p className="text-sm opacity-70">Total Routes</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>156+</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Daily Passengers</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>5.2M</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Fleet Size</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>6,700+</p>
              </div>
              <div>
                <p className="text-sm opacity-70">On-time Rate</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>94.2%</p>
              </div>
            </div>
          </div>

          {/* HELP SECTION */}
          <div className="mt-16">
            <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {[
                { q: "How do I find a specific route?", a: "Visit 'Browse Routes' to view all available routes with stops, timings, and schedules." },
                { q: "How can I report a problem?", a: "Use 'File a Complaint' to report any issues related to buses, drivers, or service quality." },
                { q: "What should I do in case of an emergency?", a: "Click 'Report Accident' to immediately notify authorities about any safety incidents." },
                { q: "Are there any discounts available?", a: "Check with BMTC counters or visit our main office for information on passes and discounts." }
              ].map((item, i) => (
                <div key={i} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.q}</p>
                  <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ========== ADMIN DASHBOARD (ORIGINAL - FULL VERSION) ==========
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100'}`}>

      {/* TOP NAV */}
      <header className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/70 border-b'} backdrop-blur-md`}>
        {/* Top bar */}
        <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <nav className={`flex gap-8 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <Link to="/" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition font-semibold text-blue-600`}>Dashboard</Link>
            <Link to="/drivers" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition`}>Drivers</Link>
            <Link to="/conductors" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition`}>Conductors</Link>
            <Link to="/buses" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition`}>Buses</Link>
            <Link to="/routes" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition`}>Routes</Link>
            <Link to="/shifts" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition`}>Shifts</Link>
            <Link to="/complaints" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition`}>Complaints</Link>
            <Link to="/accidents" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition`}>Accidents</Link>
          </nav>

          <div className="flex gap-4 items-center">
            <button className={`relative ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} p-2 rounded-lg transition`}>
              <Bell className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                3
              </span>
            </button>
            <div className={`flex items-center gap-3 ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200'} px-4 py-2 rounded-lg`}>
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                A
              </div>
              <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Admin</span>
            </div>
          </div>
        </div>

        {/* Quick actions bar */}
        <div className={`px-6 py-3 ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gradient-to-r from-blue-50 to-transparent border-t'} flex gap-3`}>
          <Link to="/add-driver" className={`inline-flex items-center gap-2 ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'} px-4 py-1.5 rounded-md text-xs font-semibold transition shadow-sm`}>
            <Plus className="h-3.5 w-3.5" />
            Add Driver
          </Link>
          <Link to="/add-conductor" className={`inline-flex items-center gap-2 ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'} px-4 py-1.5 rounded-md text-xs font-semibold transition shadow-sm`}>
            <Plus className="h-3.5 w-3.5" />
            Add Conductor
          </Link>
          <Link to="/add-bus" className={`inline-flex items-center gap-2 ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'} px-4 py-1.5 rounded-md text-xs font-semibold transition shadow-sm`}>
            <Plus className="h-3.5 w-3.5" />
            Add Bus
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="flex items-end justify-between">
          <div>
            <h1 className={`text-5xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Welcome to BMTC</h1>
            <p className={`mt-3 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage large-scale transportation operations serving millions of commuters
            </p>
          </div>
          <div className={`text-right ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-sm">Today at <span className="font-semibold">10:45 AM</span></p>
          </div>
        </div>
      </section>

      {/* SUMMARY CARDS */}
      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Drivers", value: "4", icon: Users, color: "from-blue-500 to-blue-600" },
            { label: "Fleet", value: "3", icon: Bus, color: "from-purple-500 to-purple-600" },
            { label: "Routes", value: "3", icon: Map, color: "from-green-500 to-green-600" },
            { label: "Shifts", value: "3", icon: Clock, color: "from-orange-500 to-orange-600" }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white hover:shadow-lg border-gray-200'} rounded-xl border p-6 shadow-sm hover:shadow-md transition duration-300 cursor-pointer transform hover:scale-105`}>
                <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className={`text-xs uppercase tracking-wider font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</p>
                <p className={`text-4xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* KPI SECTION (SCROLL REVEAL) */}
      <section ref={kpiRef} className="max-w-7xl mx-auto px-6 pb-8">
        {showKpis && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 animate-fadeIn">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              const isPositive = stat.change.startsWith("+");
              return (
                <div key={i} className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white hover:shadow-lg border-gray-200'} border rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300 group`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                      <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                    </div>
                    <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center transform group-hover:scale-110 transition`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1">
                    {isPositive ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                    <p className={`text-sm font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className="mt-3 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${stat.gradient}`} style={{width: stat.value.replace('%', '') + '%'}}></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CHARTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 shadow-sm`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Weekly Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                <XAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                    border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
                    borderRadius: "8px"
                  }}
                  labelStyle={{ color: darkMode ? "#e5e7eb" : "#1f2937" }}
                />
                <Line type="monotone" dataKey="performance" stroke="#3b82f6" strokeWidth={2} dot={{fill: "#3b82f6", r: 4}} />
                <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={{fill: "#10b981", r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Fleet Status Chart */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 shadow-sm flex flex-col`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fleet Status</h3>
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={fleetStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {fleetStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                      border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
                      borderRadius: "8px"
                    }}
                    labelStyle={{ color: darkMode ? "#e5e7eb" : "#1f2937" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT ACTIVITY */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl border shadow-sm overflow-hidden`}>
          <div className={`flex justify-between items-center px-6 py-5 ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-b border-gray-200 bg-gradient-to-r from-blue-50 to-transparent'}`}>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h2>
            </div>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
              View All →
            </button>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentActivity.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className={`flex items-center px-6 py-4 ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition`}>
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 ${activityColor(a.type)}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{a.desc}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{a.time}</p>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} ml-4 flex-shrink-0`}>
                    {a.type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
