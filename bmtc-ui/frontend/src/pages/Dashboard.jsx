import { Link } from "react-router-dom";
import {
  Bus,
  Users,
  Map,
  Clock,
  AlertTriangle,
  FileText,
  BarChart3,
  Bell,
  UserCog,
  BusFront,
  TrendingUp,
  Shield,
  Activity,
  Route,
  Ticket
} from "lucide-react";

export default function Dashboard() {
  const menuItems = [
    {
      title: "Drivers",
      to: "/drivers",
      icon: Users,
      count: 42,
      color: "from-blue-500 to-blue-600",
      description: "Manage driver information"
    },
    {
      title: "Conductors",
      to: "/conductors",
      icon: UserCog,
      count: 36,
      color: "from-cyan-500 to-cyan-600",
      description: "Conductor management"
    },
    {
      title: "Buses",
      to: "/buses",
      icon: Bus,
      count: 128,
      color: "from-green-500 to-green-600",
      description: "Fleet management"
    },
    {
      title: "Add Bus",
      to: "/add-bus",
      icon: BusFront,
      color: "from-emerald-500 to-emerald-600",
      description: "Register new bus"
    },
    {
      title: "Routes",
      to: "/routes",
      icon: Map,
      count: 56,
      color: "from-purple-500 to-purple-600",
      description: "Route planning"
    },
    {
      title: "Shifts",
      to: "/shifts",
      icon: Clock,
      count: 24,
      color: "from-amber-500 to-amber-600",
      description: "Schedule management"
    },
    {
      title: "Complaints",
      to: "/complaints",
      icon: FileText,
      count: 18,
      color: "from-red-500 to-red-600",
      description: "Customer feedback"
    },
    {
      title: "Add Complaint",
      to: "/add-complaint",
      icon: Ticket,
      color: "from-rose-500 to-rose-600",
      description: "Register new complaint"
    },
    {
      title: "Accidents",
      to: "/accidents",
      icon: AlertTriangle,
      count: 3,
      color: "from-orange-500 to-orange-600",
      description: "Incident reports"
    },
    {
      title: "Add Driver",
      to: "/add-driver",
      icon: Users,
      color: "from-indigo-500 to-indigo-600",
      description: "Register new driver"
    },
    {
      title: "Add Conductor",
      to: "/add-conductor",
      icon: UserCog,
      color: "from-teal-500 to-teal-600",
      description: "Register new conductor"
    },
    {
      title: "Analytics",
      to: "/analytics",
      icon: BarChart3,
      color: "from-violet-500 to-violet-600",
      description: "Performance insights"
    }
  ];

  const stats = [
    { 
      label: "Active Buses", 
      value: "118", 
      change: "+2%", 
      icon: Activity,
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    { 
      label: "On-time Performance", 
      value: "94.2%", 
      change: "+1.5%", 
      icon: TrendingUp,
      color: "bg-gradient-to-r from-green-500 to-green-600"
    },
    { 
      label: "Active Drivers", 
      value: "156", 
      change: "+4%", 
      icon: Users,
      color: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    { 
      label: "Daily Passengers", 
      value: "5.2M", 
      change: "+3.2%", 
      icon: Route,
      color: "bg-gradient-to-r from-amber-500 to-amber-600"
    },
    { 
      label: "Avg. Speed", 
      value: "32 km/h", 
      change: "-0.5%", 
      icon: Shield,
      color: "bg-gradient-to-r from-cyan-500 to-cyan-600"
    },
    { 
      label: "Fleet Health", 
      value: "92%", 
      change: "+1.8%", 
      icon: Bus,
      color: "bg-gradient-to-r from-emerald-500 to-emerald-600"
    }
  ];

  const recentActivity = [
    { time: "10:30 AM", description: "Route #45 schedule updated", type: "update", icon: Route },
    { time: "09:15 AM", description: "New complaint registered", type: "complaint", icon: FileText },
    { time: "Yesterday", description: "Bus maintenance completed", type: "maintenance", icon: Bus },
    { time: "Nov 12", description: "Driver performance report generated", type: "report", icon: Users },
    { time: "Nov 11", description: "New conductor registered", type: "personnel", icon: UserCog },
    { time: "Nov 10", description: "Fleet inspection passed", type: "success", icon: Shield }
  ];

  const getActivityIconColor = (type) => {
    switch (type) {
      case 'update': return 'text-blue-600 bg-blue-100';
      case 'complaint': return 'text-red-600 bg-red-100';
      case 'maintenance': return 'text-green-600 bg-green-100';
      case 'report': return 'text-purple-600 bg-purple-100';
      case 'personnel': return 'text-cyan-600 bg-cyan-100';
      case 'success': return 'text-emerald-600 bg-emerald-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">BMTC Dashboard</h1>
            <p className="text-gray-600 mt-1">Bangalore Metropolitan Transport Corporation</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2.5 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 hover:shadow-md transition-all">
                <Bell className="h-5 w-5 text-blue-600" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
                  3
                </span>
              </button>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold shadow-md">
              AD
            </div>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="glassmorphism rounded-2xl p-4 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                    <div className="flex items-end justify-between mt-2">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`h-10 w-10 rounded-lg ${stat.color} flex items-center justify-center ml-3`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Quick Access</h2>
            <p className="text-sm text-gray-500">Total {menuItems.length} modules</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.to}
                  className="group glassmorphism rounded-2xl p-5 border border-white/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    {item.count !== undefined && (
                      <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200">
                        {item.count}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1.5 line-clamp-2">{item.description}</p>
                  <div className="mt-4 flex items-center text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Open</span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="glassmorphism rounded-2xl p-6 border border-white/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
              View All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 transition-all duration-200">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 ${getActivityIconColor(activity.type)}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    activity.type === 'update' ? 'bg-blue-100 text-blue-800' :
                    activity.type === 'complaint' ? 'bg-red-100 text-red-800' :
                    activity.type === 'maintenance' ? 'bg-green-100 text-green-800' :
                    activity.type === 'report' ? 'bg-purple-100 text-purple-800' :
                    activity.type === 'personnel' ? 'bg-cyan-100 text-cyan-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 pt-6 border-t border-gray-200/50">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex items-center">
            <Bus className="h-4 w-4 text-blue-600 mr-2" />
            <p>© 2025 BMTC Management System. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <span className="px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 rounded-lg text-xs font-semibold border border-green-200">
              <span className="h-1.5 w-1.5 bg-green-500 rounded-full inline-block mr-1.5"></span>
              System: Operational
            </span>
            <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-800 rounded-lg text-xs font-semibold border border-blue-200">
              Last Updated: Today, 11:45 AM
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}