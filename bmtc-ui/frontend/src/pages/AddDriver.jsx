import { useState } from "react";
import api from "../services/api";
import { useTheme } from "../contexts/ThemeContext.jsx";

export default function AddDriver() {
  const { darkMode } = useTheme();

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
      await api.post("/drivers", form);
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
    <div
      className={`min-h-screen p-8 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 to-slate-100"
        }`}
    >
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-600 rounded-lg shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <div>
              <h2 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
                Add New Driver
              </h2>
              <p className={`${darkMode ? "text-gray-300" : "text-slate-600"} mt-1`}>
                Register a new driver to the fleet
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div
          className={`rounded-xl shadow-lg p-8 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-slate-200"
            }`}
        >
          <div className="space-y-6">
            {Object.keys(form).map(key => (
              <div key={key}>
                <label
                  className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-slate-700"
                    }`}
                >
                  {fieldLabels[key]}
                </label>

                {key === "current_status" ? (
                  <select
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg outline-none transition-all ${darkMode
                        ? "bg-gray-700 border border-gray-600 text-white"
                        : "bg-white border border-slate-300 text-slate-900"
                      } focus:ring-2 focus:ring-blue-500`}
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
                    className={`w-full px-4 py-3 rounded-lg outline-none transition-all ${darkMode
                        ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border border-slate-300 text-slate-900"
                      } focus:ring-2 focus:ring-blue-500`}
                  />
                )}
              </div>
            ))}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Driver
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div
          className={`mt-6 rounded-lg p-4 flex items-start gap-3 border ${darkMode
              ? "bg-blue-900/20 border-blue-800 text-blue-300"
              : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
        >
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium">Note</p>
            <p className="text-sm mt-1">
              Ensure all driver information is accurate and up-to-date before submitting.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
