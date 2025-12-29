import { BrowserRouter, Routes, Route, NavLink, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Drivers from "./pages/Drivers.jsx";
import AddDriver from "./pages/AddDriver.jsx";
import Buses from "./pages/Buses.jsx";
import AddBus from "./pages/AddBus.jsx";
import RoutesPage from "./pages/Routes.jsx";
import Shifts from "./pages/Shifts.jsx";
import Complaints from "./pages/Complaints.jsx";
import AddComplaint from "./pages/AddComplaint.jsx";
import Accidents from "./pages/Accidents.jsx";
import AddConductor from "./pages/AddConductor.jsx";
import Conductors from "./pages/Conductors.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Bus,
  BusFront,
  Route as RouteIcon,
  Clock,
  AlertTriangle,
  FileText,
  PlusCircle,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  X,
  UserCog,
  Calendar
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Protected Route Component
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  
  if (!token) return null;
  return children;
}

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  
  // Sidebar & Layout State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isDragging, setIsDragging] = useState(false);
  
  // User Data State
  const [user, setUser] = useState({ name: "Admin User", role: "System Administrator" });

  const sidebarRef = useRef(null);
  const dragHandleRef = useRef(null);

  // Sync User Data and Date
  useEffect(() => {
    // 1. Set Date
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-US', { 
      weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' 
    }));

    // 2. Set User from LocalStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data");
      }
    }
  }, [location]); // Re-runs when navigating (e.g., right after login)

  // Handle sidebar resize logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newWidth = Math.max(200, Math.min(400, e.clientX));
      setSidebarWidth(newWidth);
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
    };
  }, [isDragging]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const navigationItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/drivers", label: "Drivers", icon: Users },
    { path: "/add-driver", label: "Add Driver", icon: UserPlus },
    { path: "/conductors", label: "Conductors", icon: UserCog },
    { path: "/add-conductor", label: "Add Conductor", icon: UserPlus },
    { path: "/buses", label: "Buses", icon: Bus },
    { path: "/add-bus", label: "Add Bus", icon: BusFront },
    { path: "/routes", label: "Routes", icon: RouteIcon },
    { path: "/shifts", label: "Shifts", icon: Clock },
    { path: "/complaints", label: "Complaints", icon: FileText },
    { path: "/add-complaint", label: "Add Complaint", icon: PlusCircle },
    { path: "/accidents", label: "Accidents", icon: AlertTriangle },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {!isAuthPage && sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      {!isAuthPage && (
        <aside 
          ref={sidebarRef}
          className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 shadow-xl transition-all duration-300 lg:relative lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ 
            width: isCollapsed ? '80px' : `${sidebarWidth}px`,
            transition: isDragging ? 'none' : 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 h-20 border-b bg-blue-600 shrink-0">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Bus className="h-6 w-6 text-white" />
              </div>
              {!isCollapsed && (
                <div className="min-w-0">
                  <h1 className="text-lg font-bold text-white truncate uppercase tracking-wider">BMTC Admin</h1>
                </div>
              )}
            </div>
            
            {!isCollapsed && (
              <div 
                className="hidden lg:block absolute -right-1 top-1/2 w-2 h-20 cursor-col-resize hover:bg-blue-400 z-10"
                onMouseDown={() => setIsDragging(true)}
              />
            )}

            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex absolute -right-3 top-7 bg-white border border-gray-200 rounded-full p-1 shadow-md z-50 hover:scale-110 transition-transform"
            >
              {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded-xl transition-all ${
                    isActive ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
              >
                <item.icon className={`h-5 w-5 shrink-0 ${!isCollapsed && 'mr-3'}`} />
                {!isCollapsed && <span className="font-medium truncate">{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          {/* Logged In User Bottom Section */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50 shrink-0">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">{user.role}</p>
                  <button 
                    onClick={handleLogout}
                    className="text-xs text-red-500 font-semibold hover:text-red-700 flex items-center mt-1 transition-colors"
                  >
                    <LogOut className="h-3 w-3 mr-1" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen relative overflow-hidden">
        {!isAuthPage && (
          <header className="lg:hidden p-4 bg-white border-b flex items-center justify-between shrink-0">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
              <Menu size={24} />
            </button>
            <h2 className="font-bold text-blue-600">BMTC</h2>
            <div className="w-8" />
          </header>
        )}

        {/* Dynamic Page Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-50">
          <div className={`${isAuthPage ? '' : 'min-h-full bg-white rounded-3xl shadow-sm border border-gray-100 p-1'} w-full transition-all duration-500`}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/drivers" element={<ProtectedRoute><Drivers /></ProtectedRoute>} />
              <Route path="/add-driver" element={<ProtectedRoute><AddDriver /></ProtectedRoute>} />
              <Route path="/conductors" element={<ProtectedRoute><Conductors /></ProtectedRoute>} />
              <Route path="/add-conductor" element={<ProtectedRoute><AddConductor /></ProtectedRoute>} />
              <Route path="/buses" element={<ProtectedRoute><Buses /></ProtectedRoute>} />
              <Route path="/add-bus" element={<ProtectedRoute><AddBus /></ProtectedRoute>} />
              <Route path="/routes" element={<ProtectedRoute><RoutesPage /></ProtectedRoute>} />
              <Route path="/shifts" element={<ProtectedRoute><Shifts /></ProtectedRoute>} />
              <Route path="/complaints" element={<ProtectedRoute><Complaints /></ProtectedRoute>} />
              <Route path="/add-complaint" element={<ProtectedRoute><AddComplaint /></ProtectedRoute>} />
              <Route path="/accidents" element={<ProtectedRoute><Accidents /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;