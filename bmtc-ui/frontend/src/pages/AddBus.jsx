import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext.jsx";
import api from "../services/api";
import {
  Bus,
  ArrowLeft,
  Save,
  X,
  Users,
  Building,
  Tag,
  Hash,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function AddBus() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    bus_id: "",
    depot_name: "",
    capacity: "",
    type: "",
    registration_no: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!form.bus_id) newErrors.bus_id = "Bus ID is required";
    if (form.bus_id && isNaN(form.bus_id)) newErrors.bus_id = "Bus ID must be a number";

    if (!form.depot_name) newErrors.depot_name = "Depot name is required";

    if (!form.capacity) newErrors.capacity = "Capacity is required";
    if (form.capacity && (isNaN(form.capacity) || form.capacity < 1)) {
      newErrors.capacity = "Capacity must be a positive number";
    }

    if (!form.type) newErrors.type = "Bus type is required";

    if (!form.registration_no) {
      newErrors.registration_no = "Registration number is required";
    } else if (
      !/^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/.test(form.registration_no.toUpperCase())
    ) {
      newErrors.registration_no = "Invalid format. Use KA01AB1234";
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
      await api.post("/buses", {
        ...form,
        capacity: parseInt(form.capacity),
        registration_no: form.registration_no.toUpperCase()
      });

      setSuccess(true);
      setTimeout(() => navigate("/buses"), 1500);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.error || "Failed to add bus"
      });
    } finally {
      setLoading(false);
    }
  };

  const busTypes = [
    { value: "Volvo", label: "Volvo AC" },
    { value: "Electric", label: "Electric" },
    { value: "Diesel", label: "Diesel" },
    { value: "CNG", label: "CNG" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Mini", label: "Mini Bus" },
    { value: "Double", label: "Double Decker" }
  ];

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
          Back to Buses
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center">
            <Bus className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Add New Bus
            </h1>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mt-1`}>
              Register a new bus in the fleet
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
                Bus Added Successfully
              </h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "bus_id", label: "Bus ID", icon: Hash },
                  { name: "depot_name", label: "Depot Name", icon: Building },
                  { name: "capacity", label: "Capacity", icon: Users, type: "number" }
                ].map(({ name, label, icon: Icon, type }) => (
                  <div key={name}>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                      {label}
                    </label>
                    <div className="relative">
                      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type={type || "text"}
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none ${darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300"
                          }`}
                      />
                    </div>
                    {errors[name] && (
                      <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                    )}
                  </div>
                ))}

                {/* TYPE */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Type
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none ${darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300"
                      }`}
                  >
                    <option value="">Select Type</option>
                    {busTypes.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                  )}
                </div>
              </div>

              {/* REGISTRATION */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registration_no"
                  value={form.registration_no}
                  onChange={handleChange}
                  placeholder="KA01AB1234"
                  className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none ${darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                    }`}
                />
                {errors.registration_no && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.registration_no}
                  </p>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Add Bus"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/buses")}
                  className={`flex-1 py-3 rounded-lg font-semibold ${darkMode
                      ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  Cancel
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
