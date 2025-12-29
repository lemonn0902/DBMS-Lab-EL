import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Search,
  Filter,
  Download,
  Plus,
  Clock,
  User,
  Users,
  Bus,
  Route,
  Calendar,
  Eye,
  Edit2,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Shield
} from "lucide-react";

export default function Shifts() {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("time");
  const [currentPage, setCurrentPage] = useState(1);
  const shiftsPerPage = 8;

  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/shifts");
      setShifts(res.data);
    } catch (error) {
      console.error("Error fetching shifts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to extract time from datetime string
  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    
    // If it's already just time (HH:MM:SS format)
    if (timeString.includes(':') && !timeString.includes('T')) {
      const parts = timeString.split(':');
      if (parts.length >= 2) {
        const hours = parseInt(parts[0]);
        const minutes = parts[1];
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutes} ${ampm}`;
      }
    }
    
    // Try to parse as Date object
    try {
      const date = new Date(timeString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    } catch (e) {
      console.error("Error parsing time:", e);
    }
    
    // Return as is if no parsing worked
    return timeString;
  };

  // Get shift timing category (Morning/Afternoon/Evening/Night)
  const getShiftTiming = (startTime) => {
    if (!startTime) return "Unknown";
    
    try {
      let hour;
      
      // Parse hour from time string
      if (startTime.includes(':')) {
        const parts = startTime.split(':');
        hour = parseInt(parts[0]);
      } else {
        const date = new Date(startTime);
        hour = date.getHours();
      }
      
      if (hour >= 4 && hour < 12) return "Morning";
      if (hour >= 12 && hour < 17) return "Afternoon";
      if (hour >= 17 && hour < 21) return "Evening";
      return "Night";
    } catch (e) {
      return "Unknown";
    }
  };

  // Get shift status based on current time
  const getShiftStatus = (startTime, endTime) => {
    const now = new Date();
    
    try {
      // Create date objects for comparison
      const today = new Date().toDateString();
      
      // Parse start time
      let startDate = new Date(startTime);
      if (isNaN(startDate.getTime())) {
        // If parsing fails, assume today with the time
        const [hours, minutes] = startTime.split(':');
        startDate = new Date();
        startDate.setHours(parseInt(hours), parseInt(minutes || 0), 0);
      }
      
      // Parse end time
      let endDate = new Date(endTime);
      if (isNaN(endDate.getTime())) {
        const [hours, minutes] = endTime.split(':');
        endDate = new Date();
        endDate.setHours(parseInt(hours), parseInt(minutes || 0), 0);
        
        // If end time is before start time (overnight shift), add a day
        if (endDate < startDate) {
          endDate.setDate(endDate.getDate() + 1);
        }
      }
      
      if (now < startDate) return "upcoming";
      if (now >= startDate && now <= endDate) return "active";
      if (now > endDate) return "completed";
    } catch (error) {
      console.error("Error determining shift status:", error);
    }
    
    return "unknown";
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Active" },
      upcoming: { color: "bg-blue-100 text-blue-800", icon: Clock, label: "Upcoming" },
      completed: { color: "bg-gray-100 text-gray-800", icon: CheckCircle, label: "Completed" },
      cancelled: { color: "bg-red-100 text-red-800", icon: XCircle, label: "Cancelled" },
      unknown: { color: "bg-gray-100 text-gray-800", icon: AlertCircle, label: "Unknown" }
    };
    
    const { color, icon: Icon, label } = config[status] || config.unknown;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {label}
      </span>
    );
  };

  const filteredShifts = shifts.filter(shift => {
    const matchesSearch = 
      shift.Driver?.name?.toLowerCase().includes(search.toLowerCase()) ||
      shift.Conductor?.name?.toLowerCase().includes(search.toLowerCase()) ||
      shift.Bus?.registration_no?.toLowerCase().includes(search.toLowerCase()) ||
      shift.Route?.start_point?.toLowerCase().includes(search.toLowerCase()) ||
      shift.Route?.end_point?.toLowerCase().includes(search.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    
    const status = getShiftStatus(shift.start_time, shift.end_time);
    return matchesSearch && status === filter;
  });

  const sortedShifts = [...filteredShifts].sort((a, b) => {
    switch (sortBy) {
      case "time":
        // Try to sort by time
        try {
          const timeA = a.start_time || "00:00";
          const timeB = b.start_time || "00:00";
          const [hoursA] = timeA.split(':').map(Number);
          const [hoursB] = timeB.split(':').map(Number);
          return hoursA - hoursB;
        } catch {
          return 0;
        }
      case "driver":
        return (a.Driver?.name || "").localeCompare(b.Driver?.name || "");
      case "route":
        return (a.Route?.start_point || "").localeCompare(b.Route?.start_point || "");
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastShift = currentPage * shiftsPerPage;
  const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
  const currentShifts = sortedShifts.slice(indexOfFirstShift, indexOfLastShift);
  const totalPages = Math.ceil(sortedShifts.length / shiftsPerPage);

  const handleView = (shift) => {
    console.log("View shift:", shift);
  };

  const handleEdit = (shift) => {
    console.log("Edit shift:", shift);
  };

  const handleAssign = (shift) => {
    console.log("Assign resources to shift:", shift);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading shifts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shift Management</h1>
            <p className="text-gray-600 mt-1">Schedule and monitor driver shifts</p>
          </div>
          <button className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="h-5 w-5 mr-2" />
            Create New Shift
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Shifts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {shifts.filter(s => getShiftStatus(s.start_time, s.end_time) === "active").length}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Scheduled Today</p>
                <p className="text-2xl font-bold text-gray-900">
                  {shifts.length} {/* Since we don't have date info, show total */}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Drivers on Duty</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(shifts.filter(s => getShiftStatus(s.start_time, s.end_time) === "active").map(s => s.driver_id)).size}
                </p>
              </div>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Buses in Service</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(shifts.filter(s => getShiftStatus(s.start_time, s.end_time) === "active").map(s => s.bus_id)).size}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Bus className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search shifts by driver, conductor, bus, or route..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="all">All Shifts</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="time">Sort by Time</option>
                <option value="driver">Sort by Driver</option>
                <option value="route">Sort by Route</option>
              </select>
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            
            <button
              onClick={fetchShifts}
              className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="h-5 w-5 mr-2 text-gray-600" />
              Refresh
            </button>
            
            <button
              onClick={() => console.log("Export shifts")}
              className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-5 w-5 mr-2 text-gray-600" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Shifts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Shift Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Personnel
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Vehicle & Route
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Timing
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentShifts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-lg">No shifts found</p>
                      {search && (
                        <p className="text-sm mt-1">Try adjusting your search criteria</p>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                currentShifts.map((shift) => {
                  const status = getShiftStatus(shift.start_time, shift.end_time);
                  const timingCategory = getShiftTiming(shift.start_time);
                  
                  return (
                    <tr key={shift.shift_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Shift #{shift.shift_id}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              ID: {shift.shift_id}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <User className="h-3 w-3 text-gray-400 mr-2" />
                            <div>
                              <p className="text-xs text-gray-500">Driver</p>
                              <p className="text-sm font-medium text-gray-900">
                                {shift.Driver?.name || "Unassigned"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 text-gray-400 mr-2" />
                            <div>
                              <p className="text-xs text-gray-500">Conductor</p>
                              <p className="text-sm font-medium text-gray-900">
                                {shift.Conductor?.name || "Unassigned"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Bus className="h-3 w-3 text-gray-400 mr-2" />
                            <div>
                              <p className="text-xs text-gray-500">Bus</p>
                              <p className="text-sm font-medium text-gray-900 font-mono">
                                {shift.Bus?.registration_no || "N/A"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Route className="h-3 w-3 text-gray-400 mr-2" />
                            <div>
                              <p className="text-xs text-gray-500">Route</p>
                              <p className="text-sm font-medium text-gray-900">
                                {shift.Route ? `${shift.Route.start_point} → ${shift.Route.end_point}` : "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-gray-500">Schedule</p>
                            <p className="text-sm font-medium text-gray-900">
                              {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                            </p>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            timingCategory === "Morning" ? "bg-amber-100 text-amber-800" :
                            timingCategory === "Afternoon" ? "bg-orange-100 text-orange-800" :
                            timingCategory === "Evening" ? "bg-purple-100 text-purple-800" :
                            "bg-blue-100 text-blue-800"
                          }`}>
                            {timingCategory}
                          </span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        {getStatusBadge(status)}
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleView(shift)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(shift)}
                            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit shift"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          {status === "upcoming" && (
                            <button
                              onClick={() => handleAssign(shift)}
                              className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              title="Assign resources"
                            >
                              <Shield className="h-4 w-4" />
                            </button>
                          )}
                          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {sortedShifts.length > shiftsPerPage && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstShift + 1}</span> to{" "}
                <span className="font-medium">{Math.min(indexOfLastShift, sortedShifts.length)}</span>{" "}
                of <span className="font-medium">{sortedShifts.length}</span> shifts
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}