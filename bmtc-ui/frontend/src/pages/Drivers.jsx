import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { UserPlus } from "lucide-react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit2,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  User,
  Phone,
  IdCard,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from "lucide-react";

export default function Drivers() {
  const { darkMode } = useTheme();

  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 8;

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/drivers");
      setDrivers(res.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      inactive: { color: "bg-red-100 text-red-800", icon: XCircle },
      on_leave: { color: "bg-amber-100 text-amber-800", icon: Clock },
      suspended: { color: "bg-gray-100 text-gray-800", icon: AlertCircle }
    };

    const config =
      statusConfig[status?.toLowerCase()] ||
      { color: "bg-gray-100 text-gray-800", icon: Clock };

    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status?.replace("_", " ") || "Unknown"}
      </span>
    );
  };

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch =
      driver.name?.toLowerCase().includes(search.toLowerCase()) ||
      driver.license_no?.toLowerCase().includes(search.toLowerCase()) ||
      driver.contact_no?.includes(search) ||
      driver.driver_id?.toString().includes(search);

    const matchesStatus =
      statusFilter === "all" ||
      driver.current_status?.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = filteredDrivers.slice(indexOfFirstDriver, indexOfLastDriver);
  const totalPages = Math.ceil(filteredDrivers.length / driversPerPage);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? "bg-gray-900" : ""}`}>
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Loading drivers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Driver Management
            </h1>
            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              Manage and monitor all bus drivers
            </p>
          </div>

          <Link to="/AddDriver">
            <button className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm">
              <UserPlus className="h-5 w-5 mr-2" />
              Add New Driver
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Drivers", value: drivers.length },
            { label: "Active", value: drivers.filter(d => d.current_status === "active").length, color: "text-green-500" },
            { label: "On Leave", value: drivers.filter(d => d.current_status === "on_leave").length, color: "text-amber-500" },
            { label: "Suspended", value: drivers.filter(d => d.current_status === "suspended").length, color: "text-red-500" }
          ].map((s, i) => (
            <div
              key={i}
              className={`rounded-xl p-4 shadow-sm border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                }`}
            >
              <p className="text-sm text-gray-400">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color || (darkMode ? "text-white" : "text-gray-900")}`}>
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-xl p-4 mb-6 shadow-sm border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search drivers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none ${darkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-600"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
            />
          </div>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className={`px-4 py-2.5 rounded-lg border outline-none ${darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
                }`}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on_leave">On Leave</option>
              <option value="suspended">Suspended</option>
            </select>

            <button
              onClick={fetchDrivers}
              className={`px-4 py-2.5 rounded-lg border transition ${darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 hover:bg-gray-50"
                }`}
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-xl shadow-sm border overflow-hidden ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}>
        <table className="w-full">
          <thead className={darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-700"}>
            <tr>
              {["Driver", "License", "Contact", "Status", "Actions"].map(h => (
                <th key={h} className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={darkMode ? "divide-gray-700" : "divide-gray-200"}>
            {currentDrivers.map(driver => (
              <tr
                key={driver.driver_id}
                className={darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}
              >
                <td className="px-6 py-4 text-sm font-medium">
                  <span className={darkMode ? "text-white" : "text-gray-900"}>
                    {driver.name}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-sm text-gray-400">
                  {driver.license_no}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {driver.contact_no}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(driver.current_status)}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Eye className="h-4 w-4 cursor-pointer text-blue-500" />
                  <Edit2 className="h-4 w-4 cursor-pointer text-green-500" />
                  <MoreVertical className="h-4 w-4 cursor-pointer text-gray-400" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {filteredDrivers.length > driversPerPage && (
          <div className={`px-6 py-4 border-t ${darkMode ? "border-gray-700 text-gray-300" : "border-gray-200 text-gray-700"
            }`}>
            <div className="flex justify-between items-center">
              <span className="text-sm">
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
        )}
      </div>
    </div>
  );
}
