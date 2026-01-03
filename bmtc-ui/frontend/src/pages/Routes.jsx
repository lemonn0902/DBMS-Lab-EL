import { useState, useEffect } from "react";
import api from "../services/api";
import { useTheme } from "../contexts/ThemeContext.jsx";
import {
  Search,
  Filter,
  Download,
  MapPin,
  Navigation,
  Clock,
  Route,
  TrendingUp,
  Eye,
  Edit2,
  Plus,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Users,
  Car,
  AlertCircle,
  CheckCircle,
  XCircle,
  MoreVertical,
  BarChart3
} from "lucide-react";

export default function Routes() {
  const { darkMode } = useTheme();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const routesPerPage = 8;

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/routes");
      setRoutes(res.data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (trafficLevel) => {
    switch (trafficLevel?.toLowerCase()) {
      case "heavy": return "bg-red-100 text-red-800";
      case "moderate": return "bg-amber-100 text-amber-800";
      case "light": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const calculateEfficiency = (route) => {
    // Mock efficiency calculation based on distance and duration
    let duration = 1;
    if (typeof route.average_duration === 'object') {
      duration = (route.average_duration.hours || 0) * 60 + (route.average_duration.minutes || 0);
    } else {
      duration = parseInt(route.average_duration) || 1;
    }
    const efficiency = Math.round((route.total_distance / duration) * 10);
    return Math.min(efficiency, 100);
  };

  const filteredRoutes = routes.filter(route => {
    return (
      route.start_point?.toLowerCase().includes(search.toLowerCase()) ||
      route.end_point?.toLowerCase().includes(search.toLowerCase()) ||
      route.route_id?.toString().includes(search)
    );
  });

  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    switch (sortBy) {
      case "distance":
        return b.total_distance - a.total_distance;
      case "duration":
        let durationA = 0, durationB = 0;
        if (typeof a.average_duration === 'object') {
          durationA = (a.average_duration.hours || 0) * 60 + (a.average_duration.minutes || 0);
        } else {
          durationA = parseInt(a.average_duration) || 0;
        }
        if (typeof b.average_duration === 'object') {
          durationB = (b.average_duration.hours || 0) * 60 + (b.average_duration.minutes || 0);
        } else {
          durationB = parseInt(b.average_duration) || 0;
        }
        return durationB - durationA;
      case "efficiency":
        return calculateEfficiency(b) - calculateEfficiency(a);
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastRoute = currentPage * routesPerPage;
  const indexOfFirstRoute = indexOfLastRoute - routesPerPage;
  const currentRoutes = sortedRoutes.slice(indexOfFirstRoute, indexOfLastRoute);
  const totalPages = Math.ceil(sortedRoutes.length / routesPerPage);

  const handleView = (route) => {
    setSelectedRoute(route);
    console.log("View route details:", route);
  };

  const handleEdit = (route) => {
    console.log("Edit route:", route);
  };

  const handleAnalyze = (route) => {
    console.log("Analyze route:", route);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading routes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Route Management</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>Monitor and manage bus routes across the network</p>
          </div>
          <button className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="h-5 w-5 mr-2" />
            Add New Route
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-4 shadow-sm border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Routes</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{routes.length}</p>
              </div>
              <div className={`p-2 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg`}>
                <Route className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-4 shadow-sm border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg. Distance</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {Math.round(routes.reduce((sum, r) => sum + (r.total_distance || 0), 0) / routes.length)} km
                </p>
              </div>
              <div className={`p-2 ${darkMode ? 'bg-green-900' : 'bg-green-100'} rounded-lg`}>
                <Navigation className={`h-6 w-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-4 shadow-sm border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Today</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {Math.round(routes.length * 0.85)}
                </p>
              </div>
              <div className={`p-2 ${darkMode ? 'bg-amber-900' : 'bg-amber-100'} rounded-lg`}>
                <CheckCircle className={`h-6 w-6 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
              </div>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl p-4 shadow-sm border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg. Efficiency</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {Math.round(routes.reduce((sum, r) => sum + calculateEfficiency(r), 0) / routes.length)}%
                </p>
              </div>
              <div className={`p-2 ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} rounded-lg`}>
                <TrendingUp className={`h-6 w-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
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
                placeholder="Search routes by start point, end point, or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="distance">Sort by Distance</option>
                <option value="duration">Sort by Duration</option>
                <option value="efficiency">Sort by Efficiency</option>
              </select>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${viewMode === "grid" ? "bg-white shadow" : "text-gray-600"}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${viewMode === "list" ? "bg-white shadow" : "text-gray-600"}`}
              >
                List
              </button>
            </div>

            <button
              onClick={() => fetchRoutes()}
              className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="h-5 w-5 mr-2 text-gray-600" />
              Refresh
            </button>

            <button
              onClick={() => console.log("Export routes")}
              className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-5 w-5 mr-2 text-gray-600" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Routes Grid/List View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentRoutes.map((route) => {
            const efficiency = calculateEfficiency(route);
            return (
              <div key={route.route_id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Route className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-900">Route #{route.route_id}</h3>
                        <p className="text-sm text-gray-500">ID: {route.route_id}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleView(route)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-green-600 mr-2" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Start Point</p>
                        <p className="text-sm font-medium text-gray-900">{route.start_point}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-red-600 mr-2" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">End Point</p>
                        <p className="text-sm font-medium text-gray-900">{route.end_point}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Distance</p>
                        <p className="text-sm font-semibold text-gray-900">{route.total_distance} km</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {typeof route.average_duration === 'object'
                            ? `${route.average_duration.hours || 0}h ${route.average_duration.minutes || 0}m`
                            : route.average_duration}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-gray-500">Efficiency Score</p>
                        <span className={`text-xs font-medium ${efficiency >= 70 ? 'text-green-600' : efficiency >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                          {efficiency}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${efficiency >= 70 ? 'bg-green-500' : efficiency >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${efficiency}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleAnalyze(route)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Analyze
                    </button>
                    <button
                      onClick={() => handleEdit(route)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // List View
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Route Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Distance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Efficiency
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
                {currentRoutes.map((route) => {
                  const efficiency = calculateEfficiency(route);
                  return (
                    <tr key={route.route_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                              <Route className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                #{route.route_id} • {route.start_point} → {route.end_point}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                ID: {route.route_id}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Navigation className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {route.total_distance} km
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {typeof route.average_duration === 'object'
                              ? `${route.average_duration.hours || 0}h ${route.average_duration.minutes || 0}m`
                              : route.average_duration}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-24 mr-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-500">Score</span>
                              <span className={`text-xs font-medium ${efficiency >= 70 ? 'text-green-600' : efficiency >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                                {efficiency}%
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${efficiency >= 70 ? 'bg-green-500' : efficiency >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                                style={{ width: `${efficiency}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor("light")}`}>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleView(route)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(route)}
                            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleAnalyze(route)}
                            className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
                          >
                            <BarChart3 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {sortedRoutes.length > routesPerPage && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstRoute + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(indexOfLastRoute, sortedRoutes.length)}</span>{" "}
                  of <span className="font-medium">{sortedRoutes.length}</span> routes
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
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium ${currentPage === pageNum
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
      )}
    </div>
  );
}