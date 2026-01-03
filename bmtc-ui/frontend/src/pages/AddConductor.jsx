import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext.jsx";
import api from "../services/api";
import {
  Users,
  ArrowLeft,
  Save,
  X,
  User,
  Calendar,
  Phone,
  Hash,
  MapPin,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Clock,
  Award
} from "lucide-react";

export default function AddConductor() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    conductor_id: "",
    name: "",
    join_date: "",
    contact_no: "",
    assigned_route: "",
    experience: ""
  });

  useEffect(() => {
    api.get("/routes")
      .then(res => setRoutes(res.data))
      .catch(() =>
        setErrors(prev => ({ ...prev, fetch: "Failed to load routes" }))
      );
  }, []);

  const validateForm = () => {
    const e = {};
    if (!form.conductor_id || isNaN(form.conductor_id)) e.conductor_id = "Valid ID required";
    if (!form.name || form.name.length < 3) e.name = "Name too short";
    if (!form.join_date) e.join_date = "Join date required";
    if (!/^\d{10}$/.test(form.contact_no)) e.contact_no = "10 digit phone required";
    if (form.experience && isNaN(form.experience)) e.experience = "Invalid experience";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "contact_no" ? value.replace(/\D/g, "").slice(0, 10) : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await api.post("/conductors", {
        ...form,
        conductor_id: parseInt(form.conductor_id),
        assigned_route: form.assigned_route ? parseInt(form.assigned_route) : null,
        experience: form.experience ? parseInt(form.experience) : 0
      });
      setSuccess(true);
      setTimeout(() => navigate("/conductors"), 1500);
    } catch (err) {
      setErrors({ submit: err.response?.data?.error || "Failed to add conductor" });
    } finally {
      setLoading(false);
    }
  };

  const inputBase = `w-full px-4 py-3 rounded-lg outline-none transition-all focus:ring-2`;
  const lightInput = "border border-gray-300 focus:ring-cyan-500 bg-white";
  const darkInput = "border border-gray-600 bg-gray-700 text-white focus:ring-cyan-500";

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-cyan-50"}`}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <button
          onClick={() => navigate("/conductors")}
          className={`flex items-center mb-6 text-sm ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Conductors
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-xl bg-cyan-600 flex items-center justify-center">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Register New Conductor
            </h1>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Add a new conductor to the BMTC team
            </p>
          </div>
        </div>

        {/* Card */}
        <div className={`rounded-2xl overflow-hidden border shadow-xl ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}>

          {/* Card Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-cyan-600 to-cyan-700">
            <h2 className="text-xl font-semibold text-white">Conductor Details</h2>
            <p className="text-cyan-100 text-sm">Fill all required information</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">

            {/* Errors */}
            {(errors.submit || errors.fetch) && (
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 flex">
                <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
                <p className="text-red-300">{errors.submit || errors.fetch}</p>
              </div>
            )}

            {/* Basic Info */}
            <section>
              <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? "text-white" : "text-gray-900"}`}>
                <User className="h-5 w-5 mr-2 text-cyan-500" />
                Basic Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  name="conductor_id"
                  placeholder="Conductor ID"
                  value={form.conductor_id}
                  onChange={handleChange}
                  className={`${inputBase} ${darkMode ? darkInput : lightInput}`}
                />

                <input
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className={`${inputBase} ${darkMode ? darkInput : lightInput}`}
                />
              </div>
            </section>

            {/* Employment */}
            <section>
              <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? "text-white" : "text-gray-900"}`}>
                <Briefcase className="h-5 w-5 mr-2 text-cyan-500" />
                Employment Details
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="date"
                  name="join_date"
                  value={form.join_date}
                  onChange={handleChange}
                  className={`${inputBase} ${darkMode ? darkInput : lightInput}`}
                />

                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  className={`${inputBase} ${darkMode ? darkInput : lightInput}`}
                >
                  <option value="">Experience</option>
                  <option value="0">Fresher</option>
                  <option value="2">2 years</option>
                  <option value="5">5 years</option>
                  <option value="10">10+ years</option>
                </select>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? "text-white" : "text-gray-900"}`}>
                <Phone className="h-5 w-5 mr-2 text-cyan-500" />
                Contact Information
              </h3>

              <input
                name="contact_no"
                placeholder="10-digit phone number"
                value={form.contact_no}
                onChange={handleChange}
                className={`${inputBase} ${darkMode ? darkInput : lightInput}`}
              />
            </section>

            {/* Route */}
            <section>
              <h3 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? "text-white" : "text-gray-900"}`}>
                <MapPin className="h-5 w-5 mr-2 text-cyan-500" />
                Route Assignment
              </h3>

              <select
                name="assigned_route"
                value={form.assigned_route}
                onChange={handleChange}
                className={`${inputBase} ${darkMode ? darkInput : lightInput}`}
              >
                <option value="">Optional</option>
                {routes.map(r => (
                  <option key={r.route_id} value={r.route_id}>
                    Route #{r.route_id}: {r.start_point} → {r.end_point}
                  </option>
                ))}
              </select>
            </section>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-gray-700">
              <button
                type="submit"
                disabled={loading || success}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-semibold"
              >
                {loading ? "Registering..." : success ? "Registered!" : "Register Conductor"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/conductors")}
                className={`flex-1 py-3 rounded-lg font-semibold ${darkMode
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
