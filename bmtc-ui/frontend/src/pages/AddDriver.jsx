import { useState } from "react";
import api from "../services/api";

export default function AddDriver() {
  const [form, setForm] = useState({
    driver_id: "",
    name: "",
    license_no: "",
    join_date: "",
    experience_years: "",
    contact_no: "",
    current_status: "Active"
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await api.post("/drivers", form);
      alert("Driver added successfully!");
      setForm({
        driver_id: "",
        name: "",
        license_no: "",
        join_date: "",
        experience_years: "",
        contact_no: "",
        current_status: "Active"
      });
    } catch (error) {
      console.error("Error adding driver:", error);
      alert(`Error: ${error.response?.data?.error || error.message || "Failed to add driver"}`);
    }
  };

  const fieldLabels = {
    driver_id: "Driver ID",
    name: "Full Name",
    license_no: "License Number",
    join_date: "Join Date",
    experience_years: "Years of Experience",
    contact_no: "Contact Number",
    current_status: "Current Status"
  };

  const fieldTypes = {
    join_date: "date",
    experience_years: "number",
    contact_no: "tel"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-600 rounded-lg shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-slate-800">Add New Driver</h2>
              <p className="text-slate-600 mt-1">Register a new driver to the fleet</p>
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
                
                {key === "current_status" ? (
                  <select
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                ) : (
                  <input
                    type={fieldTypes[key] || "text"}
                    name={key}
                    value={form[key]}
                    placeholder={`Enter ${fieldLabels[key].toLowerCase()}`}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                )}
              </div>
            ))}

            <button 
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Driver
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
            <p className="text-sm text-blue-700 mt-1">Ensure all driver information is accurate and up-to-date before submitting.</p>
          </div>
        </div>
      </div>
    </div>
  );
}