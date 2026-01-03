import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext.jsx";
import api from "../services/api";

export default function AddAccident() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [drivers, setDrivers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({
    accident_id: "",
    bus_id: "",
    driver_id: "",
    route_id: "",
    location: "",
    cost: "",
    accident_date: "",
    accident_details: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [driversRes, busesRes, routesRes] = await Promise.all([
          api.get("/drivers").catch(() => ({ data: [] })),
          api.get("/buses").catch(() => ({ data: [] })),
          api.get("/routes").catch(() => ({ data: [] }))
        ]);
        setDrivers(driversRes.data || []);
        setBuses(busesRes.data || []);
        setRoutes(routesRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        accident_id: parseInt(form.accident_id),
        bus_id: form.bus_id ? parseInt(form.bus_id) : null,
        driver_id: form.driver_id ? parseInt(form.driver_id) : null,
        route_id: form.route_id ? parseInt(form.route_id) : null,
        location: form.location || null,
        cost: form.cost ? parseInt(form.cost) : null,
        accident_date: form.accident_date || null,
        accident_details: form.accident_details || null
      };

      await api.post("/accidents", payload);
      alert("Accident report submitted successfully!");
      navigate("/accidents");
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        error.response?.data?.details ||
        error.message ||
        "Failed to submit accident report";
      alert(`Error: ${msg}`);
    }
  };

  const fieldLabels = {
    accident_id: "Accident ID",
    bus_id: "Bus",
    driver_id: "Driver",
    route_id: "Route",
    location: "Location",
    cost: "Estimated Cost (₹)",
    accident_date: "Accident Date",
    accident_details: "Accident Details"
  };

  const inputBase = `w-full px-4 py-3 rounded-lg border outline-none transition-all`;
  const inputLight = `border-slate-300 bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500`;
  const inputDark = `border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-orange-600 focus:border-orange-600`;

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 to-slate-100"} p-8`}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-orange-600 rounded-lg shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h2 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
                Report Accident
              </h2>
              <p className={`${darkMode ? "text-gray-300" : "text-slate-600"} mt-1`}>
                Document a fleet incident or accident
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className={`rounded-xl shadow-lg p-8 border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-slate-200"
          }`}>
          <div className="space-y-6">

            {/* Accident ID */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-slate-700"
                }`}>
                {fieldLabels.accident_id}
              </label>
              <input
                type="number"
                name="accident_id"
                value={form.accident_id}
                onChange={handleChange}
                required
                className={`${inputBase} ${darkMode ? inputDark : inputLight}`}
              />
            </div>

            {/* Driver */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-slate-700"
                }`}>
                {fieldLabels.driver_id}
              </label>
              <select
                name="driver_id"
                value={form.driver_id}
                onChange={handleChange}
                required
                className={`${inputBase} ${darkMode ? inputDark : inputLight}`}
              >
                <option value="">Select Driver</option>
                {drivers.map(d => (
                  <option key={d.driver_id} value={d.driver_id}>
                    {d.name} (ID: {d.driver_id})
                  </option>
                ))}
              </select>
            </div>

            {/* Bus */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-slate-700"
                }`}>
                {fieldLabels.bus_id}
              </label>
              <select
                name="bus_id"
                value={form.bus_id}
                onChange={handleChange}
                required
                className={`${inputBase} ${darkMode ? inputDark : inputLight}`}
              >
                <option value="">Select Bus</option>
                {buses.map(b => (
                  <option key={b.bus_id} value={b.bus_id}>
                    {b.registration_no} ({b.bus_id})
                  </option>
                ))}
              </select>
            </div>

            {/* Route */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-slate-700"
                }`}>
                {fieldLabels.route_id}
              </label>
              <select
                name="route_id"
                value={form.route_id}
                onChange={handleChange}
                required
                className={`${inputBase} ${darkMode ? inputDark : inputLight}`}
              >
                <option value="">Select Route</option>
                {routes.map(r => (
                  <option key={r.route_id} value={r.route_id}>
                    {r.start_point} → {r.end_point}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-slate-700"
                }`}>
                {fieldLabels.location}
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className={`${inputBase} ${darkMode ? inputDark : inputLight}`}
              />
            </div>

            {/* Cost + Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-slate-700"
                  }`}>
                  {fieldLabels.cost}
                </label>
                <input
                  type="number"
                  name="cost"
                  value={form.cost}
                  onChange={handleChange}
                  required
                  className={`${inputBase} ${darkMode ? inputDark : inputLight}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-slate-700"
                  }`}>
                  {fieldLabels.accident_date}
                </label>
                <input
                  type="date"
                  name="accident_date"
                  value={form.accident_date}
                  onChange={handleChange}
                  required
                  className={`${inputBase} ${darkMode ? inputDark : inputLight}`}
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-slate-700"
                }`}>
                {fieldLabels.accident_details}
              </label>
              <textarea
                name="accident_details"
                value={form.accident_details}
                onChange={handleChange}
                rows={4}
                required
                className={`${inputBase} resize-none ${darkMode ? inputDark : inputLight}`}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-lg transition"
              >
                Submit Accident Report
              </button>
              <button
                type="button"
                onClick={() => navigate("/accidents")}
                className={`px-6 py-4 rounded-lg font-semibold transition ${darkMode
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className={`mt-6 rounded-lg p-4 flex gap-3 border ${darkMode
            ? "bg-orange-900/20 border-orange-700 text-orange-300"
            : "bg-orange-50 border-orange-200 text-orange-700"
          }`}>
          <p className="text-sm">
            Please provide accurate and detailed information about the accident for proper documentation.
          </p>
        </div>

      </div>
    </div>
  );
}
