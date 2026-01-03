import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext.jsx";
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
  Plus
} from "lucide-react";

export default function Dashboard() {
  const { darkMode } = useTheme();
  /* ---------------- KPI VISIBILITY ---------------- */
  const kpiRef = useRef(null);
  const [showKpis, setShowKpis] = useState(false);

  useEffect(() => {
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
  }, []);

  /* ---------------- DATA ---------------- */
  const stats = [
    { label: "Active Buses", value: "118", change: "+2%", icon: Activity },
    { label: "On-time Performance", value: "94.2%", change: "+1.5%", icon: TrendingUp },
    { label: "Active Drivers", value: "156", change: "+4%", icon: Users },
    { label: "Daily Passengers", value: "5.2M", change: "+3.2%", icon: Route },
    { label: "Avg. Speed", value: "32 km/h", change: "-0.5%", icon: Shield },
    { label: "Fleet Health", value: "92%", change: "+1.8%", icon: Bus }
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
      case "Update": return "bg-blue-100 text-blue-600";
      case "Complaint": return "bg-red-100 text-red-600";
      case "Maintenance": return "bg-green-100 text-green-600";
      case "Report": return "bg-purple-100 text-purple-600";
      case "Personnel": return "bg-cyan-100 text-cyan-600";
      default: return "bg-emerald-100 text-emerald-600";
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>

      {/* TOP NAV */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-b'}`}>
        {/* Top bar */}
        <div className="px-6 py-3 flex justify-between items-center">
          <nav className={`flex gap-6 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <Link to="/" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition`}>Dashboard</Link>
            <Link to="/drivers" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition`}>Drivers</Link>
            <Link to="/conductors" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition`}>Conductors</Link>
            <Link to="/buses" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition`}>Buses</Link>
            <Link to="/routes" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition`}>Routes</Link>
            <Link to="/shifts" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition`}>Shifts</Link>
            <Link to="/complaints" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition`}>Complaints</Link>
            <Link to="/accidents" className={`${darkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition`}>Accidents</Link>
          </nav>

          <div className="flex gap-4 items-center">
            <button className={`relative ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} p-2 rounded-lg transition`}>
              <Bell className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                3
              </span>
            </button>
            <div className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg">
              <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-sm font-semibold">
                A
              </div>
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>

        {/* Quick actions bar */}
        <div className={`px-6 py-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-t'} flex gap-3`}>
          <Link to="/add-driver" className={`inline-flex items-center gap-2 ${darkMode ? 'bg-gray-600 border-gray-500 text-gray-200 hover:bg-gray-500' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'} px-4 py-1.5 rounded-md text-xs font-medium transition`}>
            <Plus className="h-3.5 w-3.5" />
            Add Driver
          </Link>
          <Link to="/add-conductor" className={`inline-flex items-center gap-2 ${darkMode ? 'bg-gray-600 border-gray-500 text-gray-200 hover:bg-gray-500' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'} px-4 py-1.5 rounded-md text-xs font-medium transition`}>
            <Plus className="h-3.5 w-3.5" />
            Add Conductor
          </Link>
          <Link to="/add-bus" className={`inline-flex items-center gap-2 ${darkMode ? 'bg-gray-600 border-gray-500 text-gray-200 hover:bg-gray-500' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'} px-4 py-1.5 rounded-md text-xs font-medium transition`}>
            <Plus className="h-3.5 w-3.5" />
            Add Bus
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-8 pt-16 pb-20">
        <h1 className={`text-6xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>BMTC</h1>
        <p className={`mt-6 max-w-3xl text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Manage large-scale transportation operations that serve millions of
          commuters across Bangalore, connecting communities and enabling urban mobility.
        </p>

        {/* SUMMARY CARDS */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Drivers", value: "4", icon: Users },
            { label: "Fleet", value: "3", icon: Bus },
            { label: "Routes", value: "3", icon: Map },
            { label: "Shifts", value: "3", icon: Clock }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl border p-6 shadow-sm`}>
                <div className={`h-10 w-10 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center mb-4`}>
                  <Icon className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                </div>
                <p className={`text-sm uppercase ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</p>
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* KPI SECTION (SCROLL REVEAL) */}
      <section ref={kpiRef} className="max-w-7xl mx-auto px-8 pb-20">
        {showKpis && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 animate-fadeIn">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} border rounded-xl p-5 shadow-sm`}>
                  <div className="flex justify-between items-center">
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                    <Icon className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <p className={`text-3xl font-bold mt-3 ${darkMode ? 'text-white' : ''}`}>{stat.value}</p>
                  <p className={`mt-2 text-sm font-semibold ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
                    }`}>
                    {stat.change}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* RECENT ACTIVITY */}
      <section className="max-w-7xl mx-auto px-8 pb-24">
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl border shadow-sm`}>
          <div className={`flex justify-between items-center px-6 py-4 ${darkMode ? 'border-gray-700' : 'border-b'}`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : ''}`}>Recent Activity</h2>
            <button className="text-sm text-blue-600 hover:underline">
              View All →
            </button>
          </div>

          <div className="divide-y">
            {recentActivity.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className={`flex items-center px-6 py-4 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-4 ${activityColor(a.type)}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : ''}`}>{a.desc}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{a.time}</p>
                  </div>
                  <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase`}>
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
