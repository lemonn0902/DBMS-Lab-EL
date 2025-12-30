import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AddAccident() {
  const navigate = useNavigate();
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
      
      console.log("Submitting accident payload:", payload);
      await api.post("/accidents", payload);
      alert("Accident report submitted successfully!");
      navigate("/accidents");
    } catch (error) {
      console.error("Error submitting accident:", error);
      const errorMessage = error.response?.data?.error || error.response?.data?.details || error.message || "Failed to submit accident report";
      alert(`Error: ${errorMessage}`);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-orange-600 rounded-lg shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-slate-800">Report Accident</h2>
              <p className="text-slate-600 mt-1">Document a fleet incident or accident</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {/* Accident ID */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {fieldLabels.accident_id}
              </label>
              <input
                type="number"
                name="accident_id"
                value={form.accident_id}
                onChange={handleChange}
                placeholder="Enter accident ID"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
              />
            </div>

            {/* Driver Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {fieldLabels.driver_id}
              </label>
              <select
                name="driver_id"
                value={form.driver_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none bg-white"
              >
                <option value="">Select Driver</option>
                {drivers.map(driver => (
                  <option key={driver.driver_id} value={driver.driver_id}>
                    {driver.name} (ID: {driver.driver_id})
                  </option>
                ))}
              </select>
            </div>

            {/* Bus Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {fieldLabels.bus_id}
              </label>
              <select
                name="bus_id"
                value={form.bus_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none bg-white"
              >
                <option value="">Select Bus</option>
                {buses.map(bus => (
                  <option key={bus.bus_id} value={bus.bus_id}>
                    {bus.registration_no} - {bus.type} (ID: {bus.bus_id})
                  </option>
                ))}
              </select>
            </div>

            {/* Route Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {fieldLabels.route_id}
              </label>
              <select
                name="route_id"
                value={form.route_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none bg-white"
              >
                <option value="">Select Route</option>
                {routes.map(route => (
                  <option key={route.route_id} value={route.route_id}>
                    Route {route.route_id}: {route.start_point} → {route.end_point}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {fieldLabels.location}
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter accident location"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
              />
            </div>

            {/* Cost and Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {fieldLabels.cost}
                </label>
                <input
                  type="number"
                  name="cost"
                  value={form.cost}
                  onChange={handleChange}
                  placeholder="Enter estimated cost"
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {fieldLabels.accident_date}
                </label>
                <input
                  type="date"
                  name="accident_date"
                  value={form.accident_date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">Format: YYYY-MM-DD</p>
              </div>
            </div>

            {/* Accident Details */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {fieldLabels.accident_details}
              </label>
              <textarea
                name="accident_details"
                value={form.accident_details}
                onChange={handleChange}
                placeholder="Enter detailed description of the accident"
                rows={4}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button 
                type="submit"
                onClick={handleSubmit}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Submit Accident Report
              </button>
              <button
                type="button"
                onClick={() => navigate("/accidents")}
                className="px-6 border-2 border-slate-300 text-slate-700 font-semibold py-4 rounded-lg hover:bg-slate-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-orange-800 font-medium">Important</p>
            <p className="text-sm text-orange-700 mt-1">Please provide accurate and detailed information about the accident for proper documentation and insurance purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

