import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext.jsx";
import api from "../services/api";
import {
  Route,
  ArrowLeft,
  Save,
  MapPin,
  Navigation,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function AddRoute() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    route_id: "",
    start_point: "",
    end_point: "",
    total_distance: "",
    average_duration: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!form.route_id) newErrors.route_id = "Route ID is required";
    if (form.route_id && isNaN(form.route_id)) newErrors.route_id = "Route ID must be a number";

    if (!form.start_point) newErrors.start_point = "Starting point is required";
    if (!form.end_point) newErrors.end_point = "Ending point is required";

    if (form.start_point && form.end_point && form.start_point.toLowerCase() === form.end_point.toLowerCase()) {
      newErrors.end_point = "Start and end points must be different";
    }

    if (!form.total_distance) newErrors.total_distance = "Total distance is required";
    if (form.total_distance && (isNaN(form.total_distance) || form.total_distance <= 0)) {
      newErrors.total_distance = "Distance must be a positive number";
    }

    if (!form.average_duration) newErrors.average_duration = "Average duration is required";
    if (form.average_duration && !/^\d+:\d{2}$/.test(form.average_duration)) {
      newErrors.average_duration = "Duration must be in format HH:MM (e.g., 02:30)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await api.post("/routes", {
        route_id: parseInt(form.route_id),
        start_point: form.start_point.trim(),
        end_point: form.end_point.trim(),
        total_distance: parseFloat(form.total_distance),
        average_duration: form.average_duration
      });

      setSuccess(true);
      setTimeout(() => navigate("/routes"), 1500);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.error || "Failed to add route"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"} p-6`}>
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-sm mb-6 ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
            }`}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Routes
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center">
            <Route className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Add New Route
            </h1>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mt-1`}>
              Create a new bus route for the network
            </p>
          </div>
        </div>

        {/* FORM CARD */}
        <div className={`rounded-xl border shadow-sm p-8 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}>

          {errors.submit && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-sm text-red-700">{errors.submit}</p>
            </div>
          )}

          {success ? (
            <div className="text-center py-10">
              <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-4" />
              <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"
                }`}>
                Route Added Successfully
              </h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Route ID */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                  Route ID
                </label>
                <input
                  type="number"
                  name="route_id"
                  value={form.route_id}
                  onChange={handleChange}
                  placeholder="e.g., 101"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.route_id ? "border-red-500" : darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200"
                    }`}
                />
                {errors.route_id && <p className="text-sm text-red-500 mt-1">{errors.route_id}</p>}
              </div>

              {/* Start Point */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Starting Point
                </label>
                <input
                  type="text"
                  name="start_point"
                  value={form.start_point}
                  onChange={handleChange}
                  placeholder="e.g., Majestic Bus Stand"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.start_point ? "border-red-500" : darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200"
                    }`}
                />
                {errors.start_point && <p className="text-sm text-red-500 mt-1">{errors.start_point}</p>}
              </div>

              {/* End Point */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                  <Navigation className="h-4 w-4 inline mr-2" />
                  Ending Point
                </label>
                <input
                  type="text"
                  name="end_point"
                  value={form.end_point}
                  onChange={handleChange}
                  placeholder="e.g., Kempegowda International Airport"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.end_point ? "border-red-500" : darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200"
                    }`}
                />
                {errors.end_point && <p className="text-sm text-red-500 mt-1">{errors.end_point}</p>}
              </div>

              {/* Total Distance */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                  Total Distance (km)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="total_distance"
                  value={form.total_distance}
                  onChange={handleChange}
                  placeholder="e.g., 45.5"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.total_distance ? "border-red-500" : darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200"
                    }`}
                />
                {errors.total_distance && <p className="text-sm text-red-500 mt-1">{errors.total_distance}</p>}
              </div>

              {/* Average Duration */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                  <Clock className="h-4 w-4 inline mr-2" />
                  Average Duration (HH:MM)
                </label>
                <input
                  type="text"
                  name="average_duration"
                  value={form.average_duration}
                  onChange={handleChange}
                  placeholder="e.g., 01:30"
                  pattern="\d{1,2}:\d{2}"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.average_duration ? "border-red-500" : darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200"
                    }`}
                />
                {errors.average_duration && <p className="text-sm text-red-500 mt-1">{errors.average_duration}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${darkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                    }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <Save className="h-5 w-5" />
                  {loading ? "Creating..." : "Create Route"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
