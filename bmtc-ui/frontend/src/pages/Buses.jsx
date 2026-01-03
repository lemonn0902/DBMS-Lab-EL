import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext.jsx";
import {
  Bus,
  TrendingUp,
  Users,
  Fuel,
  Search,
  Filter,
  MoreVertical,
  MapPin,
  X,
  Save
} from "lucide-react";
import api from "../services/api";

export default function Buses() {
  const { darkMode } = useTheme();
  const [buses, setBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedBus, setSelectedBus] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingBus, setEditingBus] = useState({});

  useEffect(() => {
    api.get("/buses").then(res => setBuses(res.data));
  }, []);

  /* ---------------- HELPERS ---------------- */
  const getTypeColor = (type) => {
    const types = {
      AC: "bg-blue-100 text-blue-700",
      "Non-AC": "bg-emerald-100 text-emerald-700",
      Sleeper: "bg-purple-100 text-purple-700",
      Express: "bg-orange-100 text-orange-700"
    };
    return types[type] || "bg-gray-100 text-gray-700";
  };

  const totalCapacity = buses.reduce(
    (sum, bus) => sum + (bus.capacity || 0),
    0
  );

  const avgCapacity =
    buses.length > 0 ? Math.round(totalCapacity / buses.length) : 0;

  const filteredBuses = buses.filter(bus => {
    const matchesSearch =
      String(bus.bus_id).includes(searchTerm) ||
      bus.depot_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.registration_no.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" || bus.type === filterType;

    return matchesSearch && matchesFilter;
  });

  const handleView = (bus) => {
    setSelectedBus(bus);
    setViewModalOpen(true);
  };

  const handleEdit = (bus) => {
    setEditingBus({ ...bus });
    setEditModalOpen(true);
  };

  const handleSave = () => {
    api.put(`/buses/${editingBus.bus_id}`, editingBus)
      .then(res => {
        setBuses(buses.map(bus =>
          bus.bus_id === editingBus.bus_id ? res.data : bus
        ));
        setEditModalOpen(false);
        setEditingBus({});
      })
      .catch(err => console.error('Error updating bus:', err));
  };

  const handleAdd = () => {
    const newBus = {
      bus_id: `BUS${String(buses.length + 1).padStart(3, '0')}`,
      depot_name: '',
      capacity: 40,
      type: 'Non-AC',
      registration_no: ''
    };
    setEditingBus(newBus);
    setAddModalOpen(true);
  };

  const handleSaveNew = () => {
    api.post('/buses', editingBus)
      .then(res => {
        setBuses([...buses, res.data]);
        setAddModalOpen(false);
        setEditingBus({});
      })
      .catch(err => console.error('Error adding bus:', err));
  };

  /* ---------------- UI ---------------- */
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* PAGE HEADER */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center">
              <Bus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Buses</h1>
              <p className="text-sm text-gray-500 mt-1">
                Fleet management overview
              </p>
            </div>
          </div>

          <button onClick={handleAdd} className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
            Add Bus
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Buses", value: buses.length, icon: Bus },
            { label: "Total Capacity", value: totalCapacity, icon: Users },
            { label: "Avg Capacity", value: avgCapacity, icon: Fuel },
            { label: "Bus Types", value: new Set(buses.map(b => b.type)).size, icon: TrendingUp }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white border rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <Icon className="h-5 w-5 text-gray-400" />
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* SEARCH & FILTER */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-4 mb-8 shadow-sm border`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'} h-5 w-5`} />
                <input
                  type="text"
                  placeholder="Search by bus ID, registration, or model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                />
              </div>
            </div>

            <div className="relative">
              <Filter className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'} h-5 w-5`} />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={`appearance-none pl-10 pr-8 py-2.5 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
              >
                <option value="all">All Types</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Sleeper">Sleeper</option>
                <option value="Express">Express</option>
              </select>
            </div>
          </div>
        </div>

        {/* BUS LIST (CARD GRID) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuses.map(bus => (
            <div
              key={bus.bus_id}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border'} rounded-xl shadow-sm hover:shadow-md transition`}
            >
              {/* CARD HEADER */}
              <div className={`p-4 ${darkMode ? 'border-gray-700' : 'border-b'} flex items-center justify-between`}>
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{bus.bus_id}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-1`}>
                    <MapPin className="h-3 w-3" />
                    {bus.depot_name}
                  </p>
                </div>
                <button className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                  <MoreVertical className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </button>
              </div>

              {/* CARD BODY */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                      bus.type
                    )}`}
                  >
                    {bus.type}
                  </span>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {bus.capacity}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Seats</p>
                  </div>
                </div>

                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-3`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                    Registration Number
                  </p>
                  <p className={`font-mono text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {bus.registration_no}
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button onClick={() => handleView(bus)} className={`flex-1 ${darkMode ? 'bg-blue-900 text-blue-300 hover:bg-blue-800' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'} py-2 rounded-lg text-sm font-semibold transition`}>
                    View
                  </button>
                  <button onClick={() => handleEdit(bus)} className={`flex-1 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} py-2 rounded-lg text-sm font-semibold transition`}>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredBuses.length === 0 && (
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border'} rounded-xl py-20 text-center mt-10`}>
            <Bus className={`mx-auto h-10 w-10 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <h3 className={`mt-4 text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              No buses found
            </h3>
            <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* VIEW MODAL */}
        {viewModalOpen && selectedBus && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-md w-full mx-4`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Bus Details</h2>
                <button onClick={() => setViewModalOpen(false)} className={`p-1 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded`}>
                  <X className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Bus ID</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedBus.bus_id}</p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Depot Name</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedBus.depot_name}</p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Capacity</p>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedBus.capacity} seats</p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Type</p>
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedBus.type)}`}>
                    {selectedBus.type}
                  </span>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Registration Number</p>
                  <p className={`font-mono text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedBus.registration_no}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EDIT MODAL */}
        {editModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-md w-full mx-4`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Edit Bus</h2>
                <button onClick={() => setEditModalOpen(false)} className={`p-1 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded`}>
                  <X className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Bus ID</label>
                  <input
                    type="text"
                    value={editingBus.bus_id}
                    disabled
                    className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'} rounded-lg`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Depot Name</label>
                  <input
                    type="text"
                    value={editingBus.depot_name}
                    onChange={(e) => setEditingBus({ ...editingBus, depot_name: e.target.value })}
                    className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Capacity</label>
                  <input
                    type="number"
                    value={editingBus.capacity}
                    onChange={(e) => setEditingBus({ ...editingBus, capacity: parseInt(e.target.value) })}
                    className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Type</label>
                  <select
                    value={editingBus.type}
                    onChange={(e) => setEditingBus({ ...editingBus, type: e.target.value })}
                    className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="AC">AC</option>
                    <option value="Non-AC">Non-AC</option>
                    <option value="Sleeper">Sleeper</option>
                    <option value="Express">Express</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Registration Number</label>
                  <input
                    type="text"
                    value={editingBus.registration_no}
                    onChange={(e) => setEditingBus({ ...editingBus, registration_no: e.target.value })}
                    className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                  <button onClick={() => setEditModalOpen(false)} className={`flex-1 ${darkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} py-2 rounded-lg font-semibold transition`}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADD MODAL */}
        {addModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-md w-full mx-4`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New Bus</h2>
                <button onClick={() => setAddModalOpen(false)} className={`p-1 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded`}>
                  <X className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Bus ID</label>
                  <input
                    type="text"
                    value={editingBus.bus_id}
                    disabled
                    className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'} rounded-lg`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Depot Name</label>
                  <input
                    type="text"
                    value={editingBus.depot_name}
                    onChange={(e) => setEditingBus({ ...editingBus, depot_name: e.target.value })}
                    placeholder="Enter depot name"
                    className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Capacity</label>
                  <input
                    type="number"
                    value={editingBus.capacity}
                    onChange={(e) => setEditingBus({ ...editingBus, capacity: parseInt(e.target.value) })}
                    className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Type</label>
                  <select
                    value={editingBus.type}
                    onChange={(e) => setEditingBus({ ...editingBus, type: e.target.value })}
                    className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="AC">AC</option>
                    <option value="Non-AC">Non-AC</option>
                    <option value="Sleeper">Sleeper</option>
                    <option value="Express">Express</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Registration Number</label>
                  <input
                    type="text"
                    value={editingBus.registration_no}
                    onChange={(e) => setEditingBus({ ...editingBus, registration_no: e.target.value })}
                    placeholder="Enter registration number"
                    className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={handleSaveNew} className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    <Save className="h-4 w-4" />
                    Add Bus
                  </button>
                  <button onClick={() => setAddModalOpen(false)} className={`flex-1 ${darkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} py-2 rounded-lg font-semibold transition`}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
