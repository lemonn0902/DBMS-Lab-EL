import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    conductor_id: "",
    name: "",
    join_date: "",
    contact_no: "",
    assigned_route: "",
    experience: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await api.get("/routes");
        setRoutes(res.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
        setErrors(prev => ({ ...prev, fetch: "Failed to load routes" }));
      }
    };
    fetchRoutes();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.conductor_id) newErrors.conductor_id = "Conductor ID is required";
    if (form.conductor_id && isNaN(form.conductor_id)) newErrors.conductor_id = "Conductor ID must be a number";
    
    if (!form.name) newErrors.name = "Full name is required";
    if (form.name && form.name.length < 3) newErrors.name = "Name must be at least 3 characters";
    
    if (!form.join_date) newErrors.join_date = "Join date is required";
    
    if (!form.contact_no) newErrors.contact_no = "Contact number is required";
    if (form.contact_no && !/^[0-9]{10}$/.test(form.contact_no.replace(/\D/g, ''))) 
      newErrors.contact_no = "Invalid phone number (10 digits required)";
    
    if (form.experience && (isNaN(form.experience) || form.experience < 0)) 
      newErrors.experience = "Experience must be a positive number";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format phone number
    if (name === "contact_no") {
      const cleaned = value.replace(/\D/g, '');
      formattedValue = cleaned.slice(0, 10);
    }
    
    setForm(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      const payload = {
        ...form,
        conductor_id: parseInt(form.conductor_id),
        assigned_route: form.assigned_route ? parseInt(form.assigned_route) : null,
        experience: form.experience ? parseInt(form.experience) : 0,
        contact_no: form.contact_no.replace(/\D/g, '')
      };
      
      await api.post("/conductors", payload);
      
      setSuccess(true);
      setTimeout(() => {
        navigate("/conductors");
      }, 1500);
      
    } catch (error) {
      console.error("Error adding conductor:", error);
      setErrors({
        submit: error.response?.data?.error || error.message || "Failed to add conductor"
      });
    } finally {
      setLoading(false);
    }
  };

  const experienceOptions = [
    { value: "0", label: "Fresher (0-1 years)" },
    { value: "2", label: "2 years" },
    { value: "5", label: "5 years" },
    { value: "10", label: "10+ years" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/conductors")}
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Conductors
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-700 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Register New Conductor
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Add a new conductor to the BMTC team
                  </p>
                </div>
              </div>
            </div>
            
            {success && (
              <div className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Conductor added successfully!</span>
              </div>
            )}
          </div>
        </div>

        {/* Form Card */}
        <div className="glassmorphism rounded-2xl shadow-xl overflow-hidden border border-white/20">
          {/* Form Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-cyan-600 to-cyan-700">
            <h2 className="text-xl font-semibold text-white">Conductor Details</h2>
            <p className="text-cyan-100 text-sm mt-1">
              Fill in all required information for the new conductor
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Error Alert */}
              {(errors.submit || errors.fetch) && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 font-medium">Error</p>
                    <p className="text-red-700 text-sm mt-1">{errors.submit || errors.fetch}</p>
                  </div>
                </div>
              )}

              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-cyan-600" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Conductor ID */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900 flex items-center">
                      <Hash className="h-4 w-4 mr-2 text-gray-500" />
                      Conductor ID
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="conductor_id"
                      value={form.conductor_id}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${errors.conductor_id ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'} focus:ring-2 focus:ring-opacity-20 outline-none transition-all`}
                      placeholder="Enter unique conductor ID"
                    />
                    {errors.conductor_id && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.conductor_id}
                      </p>
                    )}
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900 flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      Full Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'} focus:ring-2 focus:ring-opacity-20 outline-none transition-all`}
                      placeholder="Enter conductor's full name"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact & Employment */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-cyan-600" />
                  Contact & Employment Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Join Date */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      Join Date
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="date"
                      name="join_date"
                      value={form.join_date}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${errors.join_date ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'} focus:ring-2 focus:ring-opacity-20 outline-none transition-all`}
                    />
                    {errors.join_date && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.join_date}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Date when conductor joined BMTC
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      Experience (Years)
                    </label>
                    <select
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.experience ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'} focus:ring-2 focus:ring-opacity-20 outline-none transition-all`}
                    >
                      <option value="">Select experience level</option>
                      {experienceOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.experience && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.experience}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-cyan-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {/* Contact Number */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-900 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      Contact Number
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                        <span className="text-gray-500">+91</span>
                        <div className="h-4 w-px bg-gray-300 mx-2"></div>
                      </div>
                      <input
                        type="text"
                        name="contact_no"
                        value={form.contact_no}
                        onChange={handleChange}
                        required
                        maxLength="10"
                        className={`w-full pl-16 pr-4 py-3 rounded-lg border ${errors.contact_no ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'} focus:ring-2 focus:ring-opacity-20 outline-none transition-all`}
                        placeholder="9876543210"
                      />
                    </div>
                    {errors.contact_no && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.contact_no}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      10-digit mobile number without country code
                    </p>
                  </div>
                </div>
              </div>

              {/* Route Assignment */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-cyan-600" />
                  Route Assignment
                </h3>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Assigned Route (Optional)
                  </label>
                  <select
                    name="assigned_route"
                    value={form.assigned_route}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-20 outline-none transition-all"
                  >
                    <option value="">Select a route (optional)</option>
                    {routes.map(route => (
                      <option key={route.route_id} value={route.route_id}>
                        Route #{route.route_id}: {route.start_point} → {route.end_point} ({route.total_distance}km)
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500">
                    Route assignment can be done later through shift management
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading || success}
                  className={`inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-medium transition-all ${
                    loading || success
                      ? 'bg-cyan-400 cursor-not-allowed'
                      : 'btn-gradient hover:shadow-lg'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Registering Conductor...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Registered Successfully!
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Register Conductor
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate("/conductors")}
                  disabled={loading || success}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="h-5 w-5 mr-2" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Stats Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-card">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-cyan-600 mr-2" />
              <div className="text-sm text-gray-500">Active Conductors</div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-2">284</div>
            <div className="text-xs text-gray-500 mt-1">+8 this month</div>
          </div>
          <div className="stat-card">
            <div className="flex items-center">
              <Award className="h-5 w-5 text-amber-600 mr-2" />
              <div className="text-sm text-gray-500">Avg. Experience</div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-2">4.2 years</div>
            <div className="text-xs text-gray-500 mt-1">Industry average</div>
          </div>
          <div className="stat-card">
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 text-purple-600 mr-2" />
              <div className="text-sm text-gray-500">Vacancies</div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-2">12</div>
            <div className="text-xs text-gray-500 mt-1">positions open</div>
          </div>
        </div>
      </div>
    </div>
  );
}