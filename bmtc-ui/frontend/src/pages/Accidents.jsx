import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext.jsx";
import api from "../services/api";

export default function Accidents() {
  const { darkMode } = useTheme();
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/accidents").then(res => setItems(res.data));
  }, []);

  const getSeverityColor = (cost) => {
    if (cost >= 5000) return darkMode
      ? "border-red-600 bg-red-900/20"
      : "border-red-500 bg-red-50";
    if (cost >= 3000) return darkMode
      ? "border-orange-600 bg-orange-900/20"
      : "border-orange-500 bg-orange-50";
    return darkMode
      ? "border-yellow-600 bg-yellow-900/20"
      : "border-yellow-500 bg-yellow-50";
  };

  const getSeverityBadge = (cost) => {
    if (cost >= 5000) return {
      text: "High",
      color: darkMode
        ? "bg-red-900/30 text-red-300"
        : "bg-red-100 text-red-700"
    };
    if (cost >= 3000) return {
      text: "Medium",
      color: darkMode
        ? "bg-orange-900/30 text-orange-300"
        : "bg-orange-100 text-orange-700"
    };
    return {
      text: "Low",
      color: darkMode
        ? "bg-yellow-900/30 text-yellow-300"
        : "bg-yellow-100 text-yellow-700"
    };
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 to-slate-100"} p-8`}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-red-600 rounded-lg shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h1 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
                Accident Reports
              </h1>
              <p className={`${darkMode ? "text-gray-300" : "text-slate-600"} mt-1`}>
                Track and monitor fleet incidents
              </p>
            </div>
          </div>
        </div>

        {/* Accident Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map(a => {
            const severity = getSeverityBadge(a.cost);
            return (
              <div
                key={a.accident_id}
                className={`rounded-xl border-l-4 overflow-hidden transition-all duration-300 ${darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white shadow-md hover:shadow-xl"
                  } ${getSeverityColor(a.cost)}`}
              >
                <div className="p-6">

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-white shadow-sm"}`}>
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-slate-600"}`}>
                          Incident #{a.accident_id}
                        </p>
                        <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-semibold ${severity.color}`}>
                          {severity.text} Severity
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 text-sm">
                    {[
                      ["Driver", a.Driver?.name],
                      ["Vehicle", a.Bus?.registration_no],
                      ["Route", `${a.Route?.start_point} → ${a.Route?.end_point}`],
                      ["Location", a.location],
                      ["Date", a.accident_date]
                    ].map(([label, value], i) => (
                      <div key={i}>
                        <p className={`${darkMode ? "text-gray-400" : "text-slate-500"} text-xs mb-0.5`}>
                          {label}
                        </p>
                        <p className={`${darkMode ? "text-white" : "text-slate-800"} font-medium truncate`}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Cost */}
                  <div className={`mt-4 pt-4 border-t ${darkMode ? "border-gray-700" : "border-slate-200"}`}>
                    <div className="flex items-center justify-between">
                      <span className={`${darkMode ? "text-gray-400" : "text-slate-600"} text-xs font-medium`}>
                        Estimated Cost
                      </span>
                      <span className={`${darkMode ? "text-white" : "text-slate-800"} text-lg font-bold`}>
                        ${a.cost}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
