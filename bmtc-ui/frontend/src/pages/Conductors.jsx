import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext.jsx";
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
  Clock,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Award
} from "lucide-react";

export default function Conductors() {
  const { darkMode } = useTheme();

  const [conductors, setConductors] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [routeFilter, setRouteFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const conductorsPerPage = 10;

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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (conductor) => {
    const joinDate = new Date(conductor.join_date);
    const today = new Date();
    const months =
      (today.getFullYear() - joinDate.getFullYear()) * 12 +
      (today.getMonth() - joinDate.getMonth());

    if (!conductor.assigned_route)
      return { label: "Unassigned", color: darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800", icon: Clock };
    if (months < 6)
      return { label: "New", color: darkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-800", icon: Users };

    return { label: "Active", color: darkMode ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-800", icon: CheckCircle };
  };

  const formatDate = (d) => new Date(d).toLocaleDateString();
  const formatPhone = (p) => p ? `+91 ${p}` : "N/A";

  const filteredConductors = conductors.filter(c => {
    const matchesSearch =
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.conductor_id?.toString().includes(search);
    const matchesRoute = routeFilter === "all" || String(c.assigned_route) === routeFilter;
    return matchesSearch && matchesRoute;
  });

  const indexOfLast = currentPage * conductorsPerPage;
  const indexOfFirst = indexOfLast - conductorsPerPage;
  const currentConductors = filteredConductors.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredConductors.length / conductorsPerPage);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <RefreshCw className="h-12 w-12 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-cyan-50"}`}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-cyan-600 flex items-center justify-center">
              <UserCog className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Conductor Management
              </h1>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Manage and monitor all bus conductors
              </p>
            </div>
          </div>

          <Link
            to="/add-conductor"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add Conductor
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Conductors", value: conductors.length, icon: Users },
            { label: "Active Today", value: conductors.filter(c => c.assigned_route).length, icon: CheckCircle },
            {
              label: "Avg Experience",
              value: Math.round(
                conductors.reduce((s, c) => s + ((new Date().getFullYear() - new Date(c.join_date).getFullYear()) || 0), 0) /
                conductors.length
              ),
              icon: Award
            },
            { label: "Unassigned", value: conductors.filter(c => !c.assigned_route).length, icon: Clock }
          ].map((stat, i) => (
            <div
              key={i}
              className={`rounded-xl p-4 border ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200"
                }`}
            >
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className={`rounded-xl p-4 mb-6 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search conductors..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg outline-none ${darkMode
                    ? "bg-gray-700 text-white border border-gray-600"
                    : "bg-white border border-gray-300"
                  }`}
              />
            </div>

            <select
              value={routeFilter}
              onChange={e => setRouteFilter(e.target.value)}
              className={`px-4 py-2.5 rounded-lg outline-none ${darkMode
                  ? "bg-gray-700 text-white border border-gray-600"
                  : "bg-white border border-gray-300"
                }`}
            >
              <option value="all">All Routes</option>
              {routes.map(r => (
                <option key={r.route_id} value={r.route_id}>
                  Route {r.route_id}
                </option>
              ))}
            </select>

            <button
              onClick={fetchData}
              className={`px-4 py-2.5 rounded-lg ${darkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-100"
                }`}
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className={`rounded-xl overflow-hidden border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}>
          <table className="w-full">
            <thead className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
              <tr>
                {["Conductor", "Contact", "Join Date", "Route", "Status", "Actions"].map(h => (
                  <th key={h} className={`px-6 py-3 text-left text-xs uppercase ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {currentConductors.map(c => {
                const status = getStatusBadge(c);
                const Icon = status.icon;
                return (
                  <tr key={c.conductor_id} className={darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}>
                    <td className="px-6 py-4 text-sm font-medium">{c.name}</td>
                    <td className="px-6 py-4 text-sm">{formatPhone(c.contact_no)}</td>
                    <td className="px-6 py-4 text-sm">{formatDate(c.join_date)}</td>
                    <td className="px-6 py-4 text-sm">{c.assigned_route || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${status.color}`}>
                        <Icon className="h-3 w-3 mr-1" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <Eye className="h-4 w-4 cursor-pointer" />
                      <Edit2 className="h-4 w-4 cursor-pointer" />
                      <MoreVertical className="h-4 w-4 cursor-pointer" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className={`px-6 py-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>
                  <ChevronLeft />
                </button>
                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
