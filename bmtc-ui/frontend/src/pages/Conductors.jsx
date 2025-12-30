import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Download,
  UserCog,
  Phone,
  Calendar,
  Route,
  UserPlus,
  Users,
  Edit2,
  Eye,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Hash,
  Mail,
  MapPin,
  Award,
  TrendingUp
} from "lucide-react";

export default function Conductors() {
  const [conductors, setConductors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [routeFilter, setRouteFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const conductorsPerPage = 10;
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [conductorsRes, routesRes] = await Promise.all([
        api.get("/conductors"),
        api.get("/routes")
      ]);
      setConductors(conductorsRes.data);
      setRoutes(routesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (conductor) => {
    // Determine status based on route assignment and join date
    const hasRoute = conductor.assigned_route;
    const joinDate = new Date(conductor.join_date);
    const today = new Date();
    const monthsSinceJoin = (today.getFullYear() - joinDate.getFullYear()) * 12 + (today.getMonth() - joinDate.getMonth());
    
    if (!hasRoute) {
      return {
        color: "bg-gray-100 text-gray-800",
        icon: Clock,
        label: "Unassigned"
      };
    } else if (monthsSinceJoin < 6) {
      return {
        color: "bg-blue-100 text-blue-800",
        icon: Users,
        label: "New"
      };
    } else {
      return {
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
        label: "Active"
      };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatPhone = (phone) => {
    if (!phone) return "N/A";
    const cleaned = phone.toString().replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0,5)} ${cleaned.slice(5)}`;
    }
    return phone;
  };

  const filteredConductors = conductors.filter(conductor => {
    const matchesSearch = 
      conductor.name?.toLowerCase().includes(search.toLowerCase()) ||
      conductor.conductor_id?.toString().includes(search) ||
      conductor.contact_no?.includes(search);
    
    const matchesStatus = statusFilter === "all";
    const matchesRoute = routeFilter === "all" || 
      conductor.assigned_route?.toString() === routeFilter;
    
    return matchesSearch && matchesStatus && matchesRoute;
  });

  // Pagination
  const indexOfLastConductor = currentPage * conductorsPerPage;
  const indexOfFirstConductor = indexOfLastConductor - conductorsPerPage;
  const currentConductors = filteredConductors.slice(indexOfFirstConductor, indexOfLastConductor);
  const totalPages = Math.ceil(filteredConductors.length / conductorsPerPage);

  const handleExport = () => {
    console.log("Exporting conductors data...");
  };

  const handleView = (conductor) => {
    console.log("View conductor:", conductor);
  };

  const handleEdit = (conductor) => {
    console.log("Edit conductor:", conductor);
  };

  const getRouteInfo = (routeId) => {
    const route = routes.find(r => r.route_id === routeId);
    return route ? `${route.start_point} → ${route.end_point}` : "Not Assigned";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-cyan-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading conductors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center mb-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-700 flex items-center justify-center mr-4">
                  <UserCog className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Conductor Management</h1>
                  <p className="text-gray-600 mt-1">Manage and monitor all bus conductors</p>
                </div>
              </div>
            </div>
            <Link
              to="/add-conductor"
              className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-medium rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition-all shadow-sm hover:shadow-md"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Add New Conductor
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Conductors</p>
                  <p className="text-2xl font-bold text-gray-900">{conductors.length}</p>
                </div>
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Users className="h-6 w-6 text-cyan-600" />
                </div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Today</p>
                  <p className="text-2xl font-bold text-green-600">
                    {conductors.filter(c => c.assigned_route).length}
                  </p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Avg. Experience</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {Math.round(conductors.reduce((sum, c) => {
                      const joinDate = new Date(c.join_date);
                      const today = new Date();
                      const years = (today.getFullYear() - joinDate.getFullYear()) + 
                        (today.getMonth() - joinDate.getMonth()) / 12;
                      return sum + Math.max(years, 0);
                    }, 0) / conductors.length * 10) / 10} years
                  </p>
                </div>
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Award className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Unassigned</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {conductors.filter(c => !c.assigned_route).length}
                  </p>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Clock className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="glassmorphism rounded-2xl p-4 mb-6 shadow-sm border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search conductors by name, ID, or contact..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="unassigned">Unassigned</option>
                  <option value="new">New</option>
                </select>
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              
              <div className="relative">
                <select
                  value={routeFilter}
                  onChange={(e) => setRouteFilter(e.target.value)}
                  className="appearance-none pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white"
                >
                  <option value="all">All Routes</option>
                  {routes.map(route => (
                    <option key={route.route_id} value={route.route_id}>
                      Route {route.route_id}
                    </option>
                  ))}
                </select>
                <Route className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              
              <button
                onClick={handleExport}
                className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="h-5 w-5 mr-2 text-gray-600" />
                Export
              </button>
              
              <button
                onClick={fetchData}
                className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="h-5 w-5 mr-2 text-gray-600" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Conductors Table */}
        <div className="glassmorphism rounded-2xl shadow-sm border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Conductor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Employment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Route Assignment
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
                {currentConductors.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="text-gray-400">
                        <UserCog className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p className="text-lg">No conductors found</p>
                        {search && (
                          <p className="text-sm mt-1">Try adjusting your search criteria</p>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentConductors.map((conductor) => {
                    const status = getStatusBadge(conductor);
                    const StatusIcon = status.icon;
                    
                    return (
                      <tr key={conductor.conductor_id} className="hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gradient-to-r from-cyan-100 to-cyan-200 flex items-center justify-center">
                              <UserCog className="h-5 w-5 text-cyan-700" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {conductor.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {conductor.conductor_id}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 text-gray-400 mr-2" />
                              <div className="text-sm text-gray-900 font-mono">
                                {formatPhone(conductor.contact_no)}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 text-gray-400 mr-2" />
                              <div className="text-sm text-gray-900">
                                {formatDate(conductor.join_date)}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              Joined {new Date(conductor.join_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Route className="h-3 w-3 text-gray-400 mr-2" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {conductor.assigned_route ? `Route ${conductor.assigned_route}` : "Not Assigned"}
                              </div>
                              <div className="text-xs text-gray-500">
                                {getRouteInfo(conductor.assigned_route)}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </span>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleView(conductor)}
                              className="p-1.5 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                              title="View details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(conductor)}
                              className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Edit conductor"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
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
          {filteredConductors.length > conductorsPerPage && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstConductor + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastConductor, filteredConductors.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredConductors.length}</span> conductors
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
                            ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white'
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
    </div>
  );
}



