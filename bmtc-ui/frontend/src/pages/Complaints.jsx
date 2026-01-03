import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext.jsx";
import api from "../services/api";

export default function Complaints() {
  const { darkMode } = useTheme();
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/complaints").then(res => setItems(res.data));
  }, []);

  const getStatusColor = (status) => {
    if (darkMode) {
      const darkStatuses = {
        Pending: "bg-yellow-900/30 text-yellow-300 border-yellow-700",
        Resolved: "bg-green-900/30 text-green-300 border-green-700",
        "In Progress": "bg-blue-900/30 text-blue-300 border-blue-700",
        Rejected: "bg-red-900/30 text-red-300 border-red-700"
      };
      return darkStatuses[status] || "bg-gray-800 text-gray-300 border-gray-700";
    }

    const lightStatuses = {
      Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      Resolved: "bg-green-100 text-green-700 border-green-200",
      "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
      Rejected: "bg-red-100 text-red-700 border-red-200"
    };
    return lightStatuses[status] || "bg-slate-100 text-slate-700 border-slate-200";
  };

  const statusCounts = items.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div
      className={`min-h-screen p-8 ${darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-slate-50 to-slate-100"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-red-600 rounded-lg shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <div>
              <h2 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
                Complaints
              </h2>
              <p className={`${darkMode ? "text-gray-300" : "text-slate-600"} mt-1`}>
                Customer feedback and issues
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Complaints", value: items.length, color: "slate" },
            { label: "Pending", value: statusCounts["Pending"] || 0, color: "yellow" },
            { label: "In Progress", value: statusCounts["In Progress"] || 0, color: "blue" },
            { label: "Resolved", value: statusCounts["Resolved"] || 0, color: "green" }
          ].map((stat, i) => (
            <div
              key={i}
              className={`rounded-xl shadow-md p-6 border-l-4 ${darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-slate-300"
                }`}
            >
              <p className={`${darkMode ? "text-gray-400" : "text-slate-600"} text-sm font-medium`}>
                {stat.label}
              </p>
              <p className={`text-3xl font-bold mt-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div
          className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
            }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className={`border-b ${darkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-slate-100 border-slate-200"
                    }`}
                >
                  {["ID", "Driver", "Bus", "Status", "Details"].map(h => (
                    <th
                      key={h}
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase ${darkMode ? "text-gray-300" : "text-slate-700"
                        }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className={`${darkMode ? "divide-gray-700" : "divide-slate-200"} divide-y`}>
                {items.map(c => (
                  <tr
                    key={c.complaint_id}
                    className={`transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-slate-50"
                      }`}
                  >
                    <td className="px-6 py-4 font-semibold">
                      <span className={darkMode ? "text-white" : "text-slate-800"}>
                        #{c.complaint_id}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={darkMode ? "text-gray-300" : "text-slate-700"}>
                        {c.Driver?.name || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm">
                      <span
                        className={`px-2 py-1 rounded ${darkMode ? "bg-gray-700 text-gray-300" : "bg-slate-100 text-slate-700"
                          }`}
                      >
                        {c.Bus?.registration_no || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          c.status
                        )}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm max-w-md truncate">
                      <span className={darkMode ? "text-gray-300" : "text-slate-700"}>
                        {c.complaint_details}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {items.length === 0 && (
            <div className="text-center py-12">
              <p className={`${darkMode ? "text-gray-400" : "text-slate-500"}`}>
                No complaints found 🎉
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
