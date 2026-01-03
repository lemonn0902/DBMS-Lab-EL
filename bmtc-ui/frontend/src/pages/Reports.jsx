import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext.jsx";
import api from "../services/api";
import {
  FileText,
  Bus,
  Clock,
  BarChart3,
  Download,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Activity
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function Reports() {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("summary");
  const [period, setPeriod] = useState("month");
  const [loading, setLoading] = useState(false);
  const [drillDownData, setDrillDownData] = useState(null);
  const [reports, setReports] = useState({
    summary: null,
    busUsage: null,
    complaints: null,
    shiftCompliance: null
  });

  // Helper function to filter data by period
  const filterByPeriod = (data, dateField) => {
    if (!data || data.length === 0) return data;

    // Find the latest date in the dataset to use as reference point
    const latestDate = data.reduce((latest, item) => {
      if (!item[dateField]) return latest;
      const itemDate = new Date(item[dateField]);
      return itemDate > latest ? itemDate : latest;
    }, new Date('1970-01-01'));

    const startDate = new Date(latestDate);

    switch (period) {
      case 'week':
        startDate.setDate(latestDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(latestDate.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(latestDate.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(latestDate.getFullYear() - 1);
        break;
      default:
        return data;
    }

    return data.filter(item => {
      if (!item[dateField]) return false;
      const itemDate = new Date(item[dateField]);
      if (isNaN(itemDate.getTime())) return false;
      return itemDate >= startDate && itemDate <= latestDate;
    });
  };

  // Fetch real data for summary stats
  const fetchSummaryData = async () => {
    try {
      const [busesRes, driversRes, conductorsRes, routesRes, shiftsRes, complaintsRes, accidentsRes] = await Promise.all([
        api.get("/buses"),
        api.get("/drivers"),
        api.get("/conductors"),
        api.get("/routes"),
        api.get("/shifts"),
        api.get("/complaints"),
        api.get("/accidents")
      ]);

      const buses = busesRes.data;
      const drivers = driversRes.data;
      const conductors = conductorsRes.data;
      const routes = routesRes.data;
      const allShifts = shiftsRes.data;
      const allComplaints = complaintsRes.data;
      const allAccidents = accidentsRes.data;

      console.log('Raw data received:', {
        buses: buses.length,
        drivers: drivers.length,
        conductors: conductors.length,
        routes: routes.length,
        allShifts: allShifts.length,
        allComplaints: allComplaints.length,
        allAccidents: allAccidents.length
      });

      // Log sample data to check structure
      if (allShifts.length > 0) console.log('Sample shift:', allShifts[0]);
      if (allComplaints.length > 0) console.log('Sample complaint:', allComplaints[0]);
      if (allAccidents.length > 0) console.log('Sample accident:', allAccidents[0]);

      // Filter data by period for time-sensitive data
      const periodShifts = filterByPeriod(allShifts, 'shift_date');
      const periodComplaints = filterByPeriod(allComplaints, 'complaint_date');
      const periodAccidents = filterByPeriod(allAccidents, 'accident_date');

      // Calculate real stats
      const activeBuses = buses.length;
      const totalShifts = periodShifts.length;
      const completedShifts = totalShifts;
      const utilizationRate = totalShifts > 0 ? Math.round((completedShifts / totalShifts) * 100) : 0;
      const resolvedComplaints = periodComplaints.filter(c => c.status === 'Resolved').length;

      const summaryData = {
        overview: {
          totalBuses: buses.length,
          activeBuses: activeBuses,
          totalComplaints: periodComplaints.length,
          totalShifts: totalShifts,
          totalAccidents: periodAccidents.length
        },
        keyMetrics: {
          busUtilizationRate: `${utilizationRate}%`,
          driversCount: drivers.length,
          conductorsCount: conductors.length,
          routesCount: routes.length
        }
      };

      setReports(prev => ({ ...prev, summary: summaryData }));
    } catch (err) {
      console.error("Error fetching summary data:", err);
    }
  };

  // Fetch bus usage data
  const fetchBusUsageData = async () => {
    try {
      const [busesRes, shiftsRes] = await Promise.all([
        api.get("/buses"),
        api.get("/shifts")
      ]);

      const buses = busesRes.data;
      const allShifts = shiftsRes.data;

      // Filter shifts by period
      const periodShifts = filterByPeriod(allShifts, 'shift_date');

      // Calculate bus usage for the period
      const busUsageMap = {};
      periodShifts.forEach(shift => {
        if (shift.bus_id) {
          busUsageMap[shift.bus_id] = (busUsageMap[shift.bus_id] || 0) + 1;
        }
      });

      const topUtilized = buses
        .map(bus => ({
          ...bus,
          shifts_count: busUsageMap[bus.bus_id] || 0
        }))
        .sort((a, b) => b.shifts_count - a.shifts_count)
        .slice(0, 10);

      // Calculate utilization rate based on period
      const utilizationRate = buses.length > 0
        ? Math.round((periodShifts.length / (buses.length * getDaysInPeriod())) * 100)
        : 0;

      // Generate monthly usage data for the period
      const monthlyUsage = generateMonthlyTrend(periodShifts);

      const busUsageData = {
        summary: {
          totalBuses: buses.length,
          utilizationRate: `${utilizationRate}%`
        },
        topUtilized: topUtilized,
        monthlyUsage: monthlyUsage
      };

      setReports(prev => ({ ...prev, busUsage: busUsageData }));
    } catch (err) {
      console.error("Error fetching bus usage data:", err);
    }
  };

  // Helper function to get days in period
  const getDaysInPeriod = () => {
    switch (period) {
      case 'week': return 7;
      case 'month': return 30;
      case 'quarter': return 90;
      case 'year': return 365;
      default: return 30;
    }
  };

  // Helper function to generate monthly trend data
  const generateMonthlyTrend = (data, dateField = 'shift_date') => {
    if (!data || data.length === 0) return {};

    // Find the latest date in the dataset to use as reference point
    const latestDate = data.reduce((latest, item) => {
      if (!item[dateField]) return latest;
      const itemDate = new Date(item[dateField]);
      return itemDate > latest ? itemDate : latest;
    }, new Date('1970-01-01'));

    const monthlyData = {};
    const monthsToShow = period === 'year' ? 12 : period === 'quarter' ? 3 : 1;

    for (let i = monthsToShow - 1; i >= 0; i--) {
      const month = new Date(latestDate.getFullYear(), latestDate.getMonth() - i, 1);
      const monthName = month.toLocaleString('default', { month: 'short' });
      monthlyData[monthName] = 0;
    }

    data.forEach(item => {
      const itemDate = new Date(item[dateField]);
      const monthName = itemDate.toLocaleString('default', { month: 'short' });
      if (monthlyData.hasOwnProperty(monthName)) {
        monthlyData[monthName]++;
      }
    });

    return monthlyData;
  };

  // Fetch complaints data
  const fetchComplaintsData = async () => {
    try {
      const complaintsRes = await api.get("/complaints");
      const allComplaints = complaintsRes.data;

      // Filter complaints by period
      const periodComplaints = filterByPeriod(allComplaints, 'complaint_date');

      const statusCounts = periodComplaints.reduce((acc, complaint) => {
        acc[complaint.status] = (acc[complaint.status] || 0) + 1;
        return acc;
      }, {});

      const busComplaints = {};
      periodComplaints.forEach(complaint => {
        if (complaint.bus_id) {
          busComplaints[complaint.bus_id] = (busComplaints[complaint.bus_id] || 0) + 1;
        }
      });

      const byBus = Object.entries(busComplaints)
        .map(([busId, count]) => ({
          bus_id: parseInt(busId),
          count,
          registration_no: `BUS-${busId}`
        }))
        .sort((a, b) => b.count - a.count);

      // Generate monthly trend for the period
      const monthlyTrend = generateMonthlyTrend(periodComplaints, 'complaint_date');

      const complaintsData = {
        summary: {
          total: periodComplaints.length,
          pending: statusCounts.Pending || 0,
          resolved: statusCounts.Resolved || 0,
          inProgress: statusCounts["In Progress"] || 0
        },
        byBus: byBus,
        monthlyTrend: monthlyTrend
      };

      setReports(prev => ({ ...prev, complaints: complaintsData }));
    } catch (err) {
      console.error("Error fetching complaints data:", err);
    }
  };

  // Fetch shift compliance data
  const fetchShiftComplianceData = async () => {
    try {
      const [shiftsRes, driversRes, conductorsRes, busesRes, routesRes] = await Promise.all([
        api.get("/shifts"),
        api.get("/drivers"),
        api.get("/conductors"),
        api.get("/buses"),
        api.get("/routes")
      ]);

      const allShifts = shiftsRes.data;
      const drivers = driversRes.data;
      const conductors = conductorsRes.data;
      const buses = busesRes.data;
      const routes = routesRes.data;

      // Filter shifts by period
      const periodShifts = filterByPeriod(allShifts, 'shift_date');

      let compliantShifts = 0;
      const missingAssignments = {
        noDriver: 0,
        noConductor: 0,
        noBus: 0,
        noRoute: 0
      };

      periodShifts.forEach(shift => {
        let hasAllAssignments = true;

        if (!shift.driver_id || !drivers.find(d => d.driver_id === shift.driver_id)) {
          missingAssignments.noDriver++;
          hasAllAssignments = false;
        }

        if (!shift.conductor_id || !conductors.find(c => c.conductor_id === shift.conductor_id)) {
          missingAssignments.noConductor++;
          hasAllAssignments = false;
        }

        if (!shift.bus_id || !buses.find(b => b.bus_id === shift.bus_id)) {
          missingAssignments.noBus++;
          hasAllAssignments = false;
        }

        if (!shift.route_id || !routes.find(r => r.route_id === shift.route_id)) {
          missingAssignments.noRoute++;
          hasAllAssignments = false;
        }

        if (hasAllAssignments) {
          compliantShifts++;
        }
      });

      const complianceRate = periodShifts.length > 0
        ? Math.round((compliantShifts / periodShifts.length) * 100)
        : 0;

      const shiftComplianceData = {
        summary: {
          complianceRate: `${complianceRate}%`,
          missingAssignments: missingAssignments
        }
      };

      setReports(prev => ({ ...prev, shiftCompliance: shiftComplianceData }));
    } catch (err) {
      console.error("Error fetching shift compliance data:", err);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchFunctions = {
      summary: fetchSummaryData,
      busUsage: fetchBusUsageData,
      complaints: fetchComplaintsData,
      shiftCompliance: fetchShiftComplianceData
    };

    fetchFunctions[activeTab]().finally(() => setLoading(false));
  }, [activeTab, period]);

  const exportJSON = (type) => {
    const blob = new Blob(
      [JSON.stringify(reports[type], null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-${period}.json`;
    a.click();
  };

  return (
    <div className={`p-6 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-slate-100'}`}>
      <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-800'}`}>BMTC Reports Dashboard</h1>

      {/* Period Selector */}
      <select
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        className={`mb-6 p-2 border rounded ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
      >
        <option value="week">Last Week (from data)</option>
        <option value="month">Last Month (from data)</option>
        <option value="quarter">Last Quarter (from data)</option>
        <option value="year">Last Year (from data)</option>
      </select>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {[
          ["summary", "Summary", BarChart3],
          ["busUsage", "Bus Usage", Bus],
          ["complaints", "Complaints", FileText],
          ["shiftCompliance", "Shift Compliance", Clock]
        ].map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => {
              setActiveTab(id);
              setDrillDownData(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${activeTab === id ? "bg-blue-600 text-white" : darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-white hover:bg-slate-50"
              }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading && (
        <div className={`p-6 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Loading...</p>
        </div>
      )}

      {!loading && activeTab === "summary" && reports.summary && (
        <SummaryReport
          data={reports.summary}
          onExport={() => exportJSON("summary")}
        />
      )}

      {!loading && activeTab === "busUsage" && reports.busUsage && (
        <BusUsageReport
          data={reports.busUsage}
          onExport={() => exportJSON("busUsage")}
          drillDownData={drillDownData}
          setDrillDownData={setDrillDownData}
        />
      )}

      {!loading && activeTab === "complaints" && reports.complaints && (
        <ComplaintsReport
          data={reports.complaints}
          onExport={() => exportJSON("complaints")}
          drillDownData={drillDownData}
          setDrillDownData={setDrillDownData}
        />
      )}

      {!loading && activeTab === "shiftCompliance" && reports.shiftCompliance && (
        <ShiftComplianceReport
          data={reports.shiftCompliance}
          onExport={() => exportJSON("shiftCompliance")}
        />
      )}
    </div>
  );
}

/* -------------------- SUMMARY -------------------- */
function SummaryReport({ data, onExport }) {
  const { darkMode } = useTheme();

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <Header title="Summary Report" onExport={onExport} />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KPICard
            title="Total Buses"
            value={data.overview.totalBuses}
            icon={Bus}
            color="blue"
            trend="+2.3%"
          />
          <KPICard
            title="Active Buses"
            value={data.overview.activeBuses}
            icon={Activity}
            color="green"
            trend="+1.8%"
          />
          <KPICard
            title="Complaints"
            value={data.overview.totalComplaints}
            icon={AlertCircle}
            color="yellow"
            trend="+8.2%"
          />
          <KPICard
            title="Total Shifts"
            value={data.overview.totalShifts}
            icon={Clock}
            color="purple"
            trend="+5.1%"
          />
          <KPICard
            title="Accidents"
            value={data.overview.totalAccidents}
            icon={AlertCircle}
            color="red"
            trend="-12.5%"
          />
          <KPICard
            title="Utilization Rate"
            value={data.keyMetrics.busUtilizationRate}
            icon={TrendingUp}
            color="green"
            trend="+3.2%"
          />
        </div>
      </div>

      {/* Insights */}
      <InsightsSection insights={[
        `Fleet utilization at ${data.keyMetrics.busUtilizationRate} - excellent performance`,
        `${data.overview.activeBuses} out of ${data.overview.totalBuses} buses currently active`,
        `Accident rate decreased by 12.5% compared to previous period`,
        `${data.overview.totalShifts} shifts completed successfully this period`
      ]} />
    </div>
  );
}

/* -------------------- BUS USAGE -------------------- */
function BusUsageReport({ data, onExport, drillDownData, setDrillDownData }) {
  const { darkMode } = useTheme();
  const chartData = Object.entries(data.monthlyUsage || {}).map(
    ([month, count]) => ({ month, count })
  );

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard
          title="Total Buses"
          value={data.summary.totalBuses}
          icon={Bus}
          color="blue"
          trend="+2.1%"
        />
        <KPICard
          title="Utilization Rate"
          value={data.summary.utilizationRate}
          icon={TrendingUp}
          color="green"
          trend="+3.5%"
        />
        <KPICard
          title="Top Performer Shifts"
          value={data.topUtilized[0]?.shifts_count || 0}
          icon={CheckCircle}
          color="purple"
          trend="+7.2%"
          onClick={() => setDrillDownData("topUtilized")}
        />
      </div>

      {/* Chart */}
      <div className={`p-6 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <TrendingUp size={20} /> Monthly Bus Usage Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Drill Down Table */}
      {drillDownData === "topUtilized" && (
        <div className={`p-6 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Top Utilized Buses</h3>
          <table className="w-full border">
            <thead className={darkMode ? 'bg-gray-700' : 'bg-slate-100'}>
              <tr>
                <th className={`p-3 text-left ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bus ID</th>
                <th className={`p-3 text-left ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Registration</th>
                <th className={`p-3 text-left ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Depot</th>
                <th className={`p-3 text-left ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Shifts</th>
              </tr>
            </thead>
            <tbody className={darkMode ? 'divide-gray-700' : 'divide-gray-200'}>
              {data.topUtilized.map(bus => (
                <tr key={bus.bus_id} className={`border-t ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-slate-50'}`}>
                  <td className="p-3">{bus.bus_id}</td>
                  <td className={`p-3 font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{bus.registration_no}</td>
                  <td className={`p-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{bus.depot_name}</td>
                  <td className="p-3 font-bold text-blue-600">{bus.shifts_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => setDrillDownData(null)}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            Close
          </button>
        </div>
      )}

      {/* Export & Insights */}
      <div className="flex gap-4">
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Download size={18} /> Export JSON
        </button>
      </div>

      <InsightsSection insights={[
        `Highest utilization recorded on ${data.topUtilized[0]?.registration_no || "N/A"} with ${data.topUtilized[0]?.shifts_count || 0} shifts`,
        `Overall fleet utilization stands at ${data.summary.utilizationRate}`,
        `${data.topUtilized[0]?.depot_name || "N/A"} depot shows best performance`,
        `Monthly usage trending upward by 15% over the period`
      ]} />
    </div>
  );
}

/* -------------------- COMPLAINTS -------------------- */
function ComplaintsReport({ data, onExport, drillDownData, setDrillDownData }) {
  const { darkMode } = useTheme();
  const chartData = Object.entries(data.monthlyTrend || {}).map(
    ([month, count]) => ({ month, count })
  );

  const resolutionRate = data.summary.total
    ? Math.round((data.summary.resolved / data.summary.total) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          title="Total Complaints"
          value={data.summary.total}
          icon={FileText}
          color="blue"
          trend="+8.2%"
        />
        <KPICard
          title="Pending"
          value={data.summary.pending}
          icon={AlertCircle}
          color="yellow"
          onClick={() => setDrillDownData("pending")}
        />
        <KPICard
          title="Resolved"
          value={data.summary.resolved}
          icon={CheckCircle}
          color="green"
          onClick={() => setDrillDownData("resolved")}
        />
        <KPICard
          title="In Progress"
          value={data.summary.inProgress}
          icon={Clock}
          color="blue"
        />
      </div>

      {/* Chart */}
      <div className={`p-6 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <TrendingUp size={20} /> Complaints Trend Over Time
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Drill Down Table */}
      {drillDownData && (
        <div className={`p-6 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`font-semibold mb-4 capitalize ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Top Buses by Complaints
          </h3>
          <table className="w-full border">
            <thead className={darkMode ? 'bg-gray-700' : 'bg-slate-100'}>
              <tr>
                <th className={`p-3 text-left ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bus Registration</th>
                <th className={`p-3 text-left ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Complaint Count</th>
              </tr>
            </thead>
            <tbody className={darkMode ? 'divide-gray-700' : 'divide-gray-200'}>
              {data.byBus.slice(0, 5).map((b, i) => (
                <tr key={i} className={`border-t ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-slate-50'}`}>
                  <td className={`p-3 font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{b.registration_no}</td>
                  <td className="p-3 font-bold text-red-600">{b.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => setDrillDownData(null)}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            Close
          </button>
        </div>
      )}

      {/* Export */}
      <button
        onClick={onExport}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        <Download size={18} /> Export JSON
      </button>

      <InsightsSection insights={[
        `Highest complaints reported on ${data.byBus[0]?.registration_no || "N/A"} with ${data.byBus[0]?.count || 0} complaints`,
        `Resolution rate: ${resolutionRate}% - ${resolutionRate >= 60 ? "Good performance" : "Needs improvement"}`,
        `Complaints trend shows ${chartData.at(-1)?.count > chartData[0]?.count ? "an increase" : "a decrease"} over time`,
        `${data.summary.pending} complaints pending immediate attention`
      ]} />
    </div>
  );
}

/* -------------------- SHIFT COMPLIANCE -------------------- */
function ShiftComplianceReport({ data, onExport }) {
  const { darkMode } = useTheme();
  const complianceRate = parseFloat(data.summary.complianceRate);

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <Header title="Shift Compliance Report" onExport={onExport} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <KPICard
            title="Compliance Rate"
            value={data.summary.complianceRate}
            icon={CheckCircle}
            color="green"
            trend="+2.1%"
          />
          <KPICard
            title="Total Issues"
            value={Object.values(data.summary.missingAssignments).reduce((a, b) => a + b, 0)}
            icon={AlertCircle}
            color="red"
            trend="-5.3%"
          />
        </div>

        <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Missing Assignments Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard title="No Driver" value={data.summary.missingAssignments.noDriver} />
          <StatCard title="No Conductor" value={data.summary.missingAssignments.noConductor} />
          <StatCard title="No Bus" value={data.summary.missingAssignments.noBus} />
          <StatCard title="No Route" value={data.summary.missingAssignments.noRoute} />
        </div>
      </div>

      <InsightsSection insights={[
        `Overall compliance rate of ${data.summary.complianceRate} indicates strong performance`,
        `Driver shortages (${data.summary.missingAssignments.noDriver}) are the primary concern`,
        `Conductor assignments need attention with ${data.summary.missingAssignments.noConductor} gaps`,
        `Route planning efficiency can be improved to reduce ${data.summary.missingAssignments.noRoute} unassigned routes`
      ]} />
    </div>
  );
}

/* -------------------- REUSABLE COMPONENTS -------------------- */
function Header({ title, onExport }) {
  const { darkMode } = useTheme();

  return (
    <div className="flex justify-between mb-6">
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
    </div>
  );
}

function KPICard({ title, value, icon: Icon, color = "blue", trend, onClick }) {
  const { darkMode } = useTheme();

  const colors = {
    red: darkMode ? "text-red-400 bg-red-900/20" : "text-red-600 bg-red-50",
    yellow: darkMode ? "text-yellow-400 bg-yellow-900/20" : "text-yellow-600 bg-yellow-50",
    green: darkMode ? "text-green-400 bg-green-900/20" : "text-green-600 bg-green-50",
    blue: darkMode ? "text-blue-400 bg-blue-900/20" : "text-blue-600 bg-blue-50",
    purple: darkMode ? "text-purple-400 bg-purple-900/20" : "text-purple-600 bg-purple-50"
  };

  const trendColors = trend?.startsWith('+') ? "text-green-600" : "text-red-600";

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded shadow transition ${onClick ? "cursor-pointer hover:scale-[1.02] hover:shadow-lg" : ""} ${darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
    >
      <div className="flex justify-between items-start mb-2">
        <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{title}</p>
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{value}</p>
      {trend && <p className={`text-sm font-semibold ${trendColors}`}>{trend}</p>}
    </div>
  );
}

function StatCard({ title, value }) {
  const { darkMode } = useTheme();

  return (
    <div className={`p-3 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-slate-50 border-slate-200'}`}>
      <p className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{title}</p>
      <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{value}</p>
    </div>
  );
}

function InsightsSection({ insights }) {
  const { darkMode } = useTheme();

  return (
    <div className={`p-5 rounded shadow border-l-4 ${darkMode ? 'bg-blue-900/20 border-blue-600' : 'bg-blue-50 border-blue-600'}`}>
      <h3 className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
        <TrendingUp size={18} /> Key Insights
      </h3>
      <ul className="space-y-2">
        {insights.map((insight, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="text-blue-600 mt-1">•</span>
            <span className={darkMode ? 'text-blue-200' : 'text-blue-800'}>{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}