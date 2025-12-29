import { useEffect, useState } from "react";
import api from "../services/api";

export default function Accidents() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/accidents").then(res => setItems(res.data));
  }, []);

  const getSeverityColor = (cost) => {
    if (cost >= 5000) return "border-red-500 bg-red-50";
    if (cost >= 3000) return "border-orange-500 bg-orange-50";
    return "border-yellow-500 bg-yellow-50";
  };

  const getSeverityBadge = (cost) => {
    if (cost >= 5000) return { text: "High", color: "bg-red-100 text-red-700" };
    if (cost >= 3000) return { text: "Medium", color: "bg-orange-100 text-orange-700" };
    return { text: "Low", color: "bg-yellow-100 text-yellow-700" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-red-600 rounded-lg shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Accident Reports</h1>
              <p className="text-slate-600 mt-1">Track and monitor fleet incidents</p>
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
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 overflow-hidden transform hover:-translate-y-1 ${getSeverityColor(a.cost)}`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 font-medium">Incident #{a.accident_id}</p>
                        <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-semibold ${severity.color}`}>
                          {severity.text} Severity
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 mb-0.5">Driver</p>
                        <p className="text-sm font-semibold text-slate-800 truncate">{a.Driver?.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 mb-0.5">Vehicle</p>
                        <p className="text-sm font-semibold text-slate-800 truncate">{a.Bus?.registration_no}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 mb-0.5">Route</p>
                        <p className="text-sm font-medium text-slate-800 truncate">
                          {a.Route?.start_point} → {a.Route?.end_point}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 mb-0.5">Location</p>
                        <p className="text-sm font-medium text-slate-800 truncate">{a.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 mb-0.5">Date</p>
                        <p className="text-sm font-medium text-slate-800">{a.accident_date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Cost Footer */}
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600 font-medium">Estimated Cost</span>
                      <span className="text-lg font-bold text-slate-800">${a.cost}</span>
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