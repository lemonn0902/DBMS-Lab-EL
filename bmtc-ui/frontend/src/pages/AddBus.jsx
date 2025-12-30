import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    if (form.capacity && (isNaN(form.capacity) || form.capacity < 1)) 
      newErrors.capacity = "Capacity must be a positive number";
    
    if (!form.type) newErrors.type = "Bus type is required";
    
    if (!form.registration_no) {
      newErrors.registration_no = "Registration number is required";
    } else if (!/^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/.test(form.registration_no.toUpperCase())) {
      newErrors.registration_no = "Invalid format. Use format: KA01AB1234";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
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
        capacity: parseInt(form.capacity),
        registration_no: form.registration_no.toUpperCase()
      };
      
      await api.post("/buses", payload);
      
      setSuccess(true);
      setTimeout(() => {
        navigate("/buses");
      }, 1500);
      
    } catch (error) {
      console.error("Error adding bus:", error);
      setErrors({
        submit: error.response?.data?.error || error.message || "Failed to add bus"
      });
    } finally {
      setLoading(false);
    }
  };

  const busTypes = [
    { value: "Volvo", label: "Volvo AC", color: "bg-blue-100 text-blue-800" },
    { value: "Electric", label: "Electric", color: "bg-green-100 text-green-800" },
    { value: "Diesel", label: "Diesel", color: "bg-amber-100 text-amber-800" },
    { value: "CNG", label: "CNG", color: "bg-purple-100 text-purple-800" },
    { value: "Hybrid", label: "Hybrid", color: "bg-cyan-100 text-cyan-800" },
    { value: "Mini", label: "Mini Bus", color: "bg-pink-100 text-pink-800" },
    { value: "Double", label: "Double Decker", color: "bg-red-100 text-red-800" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/buses")}
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Buses
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center mr-4">
                  <Bus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Add New Bus
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Register a new bus to the BMTC fleet
                  </p>
                </div>
              </div>
            </div>
            
            {success && (
              <div className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Bus added successfully!</span>
              </div>
            )}
          </div>
        </div>

        {/* Form Card */}
        <div className="glassmorphism rounded-2xl shadow-xl overflow-hidden border border-white/20">
          {/* Form Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700">
            <h2 className="text-xl font-semibold text-white">Bus Information</h2>
            <p className="text-blue-100 text-sm mt-1">
              Fill in all required details to register the bus
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Error Alert */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 font-medium">Error</p>
                    <p className="text-red-700 text-sm mt-1">{errors.submit}</p>
                  </div>
                </div>
              )}

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bus ID */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900 flex items-center">
                    <Hash className="h-4 w-4 mr-2 text-gray-500" />
                    Bus ID
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="bus_id"
                    value={form.bus_id}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${errors.bus_id ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} focus:ring-2 focus:ring-opacity-20 outline-none transition-all`}
                    placeholder="Enter unique bus ID"
                  />
                  {errors.bus_id && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.bus_id}
                    </p>
                  )}
                </div>

                {/* Registration Number */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900 flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-gray-500" />
                    Registration Number
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="registration_no"
                    value={form.registration_no}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${errors.registration_no ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} focus:ring-2 focus:ring-opacity-20 outline-none transition-all uppercase font-mono`}
                    placeholder="KA01AB1234"
                  />
                  {errors.registration_no ? (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.registration_no}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Format: <span className="font-mono">KA##XX####</span> (e.g., KA01AB1234)
                    </p>
                  )}
                </div>

                {/* Depot Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900 flex items-center">
                    <Building className="h-4 w-4 mr-2 text-gray-500" />
                    Depot Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="depot_name"
                    value={form.depot_name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${errors.depot_name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} focus:ring-2 focus:ring-opacity-20 outline-none transition-all`}
                    placeholder="e.g., Depot 01, Banashankari"
                  />
                  {errors.depot_name && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.depot_name}
                    </p>
                  )}
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    Passenger Capacity
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={form.capacity}
                    onChange={handleChange}
                    required
                    min="1"
                    max="100"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.capacity ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'} focus:ring-2 focus:ring-opacity-20 outline-none transition-all`}
                    placeholder="e.g., 45"
                  />
                  {errors.capacity && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.capacity}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Maximum passenger capacity including seating and standing
                  </p>
                </div>
              </div>

              {/* Bus Type Selection */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-900">
                  Bus Type
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {busTypes.map(type => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => {
                        setForm(prev => ({ ...prev, type: type.value }));
                        if (errors.type) setErrors(prev => ({ ...prev, type: "" }));
                      }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        form.type === type.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${type.color}`}>
                          <Bus className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {type.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.type && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.type}
                  </p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading || success}
                  className={`inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-medium transition-all ${
                    loading || success
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'btn-gradient hover:shadow-lg'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Adding Bus...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Added Successfully!
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Add Bus to Fleet
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate("/buses")}
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
            <div className="text-sm text-gray-500">Total Fleet Size</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">1,284</div>
            <div className="text-xs text-gray-500 mt-1">+12 this month</div>
          </div>
          <div className="stat-card">
            <div className="text-sm text-gray-500">Average Capacity</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">42</div>
            <div className="text-xs text-gray-500 mt-1">passengers per bus</div>
          </div>
          <div className="stat-card">
            <div className="text-sm text-gray-500">Most Common Type</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">Diesel</div>
            <div className="text-xs text-gray-500 mt-1">45% of fleet</div>
          </div>
        </div>
      </div>
    </div>
  );
}



