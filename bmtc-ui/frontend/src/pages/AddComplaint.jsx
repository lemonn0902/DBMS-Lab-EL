import { useState } from "react";
import api from "../services/api";

export default function AddComplaint() {
  const [form, setForm] = useState({
    complaint_id: "",
    complaint_date: "",
    status: "Pending",
    bus_id: "",
    driver_id: "",
    complaint_details: ""
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/complaints", form);
    alert("Complaint submitted!");
  };

  const fieldLabels = {
    complaint_id: "Complaint ID",
    complaint_date: "Date",
    status: "Status",
    bus_id: "Bus ID",
    driver_id: "Driver ID",
    complaint_details: "Complaint Details"
  };

  const fieldTypes = {
    complaint_date: "date",
    complaint_details: "textarea"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-red-600 rounded-lg shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-slate-800">Submit Complaint</h2>
              <p className="text-slate-600 mt-1">Report an issue with bus service</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {Object.keys(form).map(key => (
              <div key={key}>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {fieldLabels[key]}
                </label>
                
                {key === "status" ? (
                  <select
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                ) : fieldTypes[key] === "textarea" ? (
                  <textarea
                    name={key}
                    value={form[key]}
                    placeholder={`Enter ${fieldLabels[key].toLowerCase()}`}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none resize-none"
                  />
                ) : (
                  <input
                    type={fieldTypes[key] || "text"}
                    name={key}
                    value={form[key]}
                    placeholder={`Enter ${fieldLabels[key].toLowerCase()}`}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                  />
                )}
              </div>
            ))}

            <button 
              onClick={handleSubmit}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Submit Complaint
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-800 font-medium">Note</p>
            <p className="text-sm text-blue-700 mt-1">Please provide accurate information to help us resolve your complaint quickly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}