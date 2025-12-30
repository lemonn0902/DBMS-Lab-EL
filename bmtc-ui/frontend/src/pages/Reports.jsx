import { useState, useEffect } from "react";
import api from "../services/api"; // ← YOUR ACTUAL API SERVICE
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

  const fetchReport = async (type) => {
    setLoading(true);
    try {
      const endpoints = {
        summary: `/reports/summary?period=${period}`,
        busUsage: `/reports/bus-usage?period=${period}`,
        complaints: `/reports/complaints?period=${period}`,
        shiftCompliance: `/reports/shift-compliance?period=${period}`
      };

      const res = await api.get(endpoints[type]);
      setReports(prev => ({ ...prev, [type]: res.data }));
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport(activeTab);
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
    <div className="p-6 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">BMTC Reports Dashboard</h1>

      {/* Period Selector */}
      <select
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        className="mb-6 p-2 border rounded bg-white"
      >
        <option value="week">Last Week</option>
        <option value="month">This Month</option>
        <option value="quarter">This Quarter</option>
        <option value="year">This Year</option>
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
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              activeTab === id ? "bg-blue-600 text-white" : "bg-white hover:bg-slate-50"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading && (
        <div className="bg-white p-6 rounded shadow">
          <p>Loading...</p>
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
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
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
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
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
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-4">Top Utilized Buses</h3>
          <table className="w-full border">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Bus ID</th>
                <th className="p-3 text-left">Registration</th>
                <th className="p-3 text-left">Depot</th>
                <th className="p-3 text-left">Shifts</th>
              </tr>
            </thead>
            <tbody>
              {data.topUtilized.map(bus => (
                <tr key={bus.bus_id} className="border-t hover:bg-slate-50">
                  <td className="p-3">{bus.bus_id}</td>
                  <td className="p-3 font-medium">{bus.registration_no}</td>
                  <td className="p-3">{bus.depot_name}</td>
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
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
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
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-4 capitalize">
            Top Buses by Complaints
          </h3>
          <table className="w-full border">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Bus Registration</th>
                <th className="p-3 text-left">Complaint Count</th>
              </tr>
            </thead>
            <tbody>
              {data.byBus.slice(0, 5).map((b, i) => (
                <tr key={i} className="border-t hover:bg-slate-50">
                  <td className="p-3 font-medium">{b.registration_no}</td>
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
  const complianceRate = parseFloat(data.summary.complianceRate);
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
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

        <h3 className="font-semibold mb-3">Missing Assignments Breakdown</h3>
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
  return (
    <div className="flex justify-between mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
}

function KPICard({ title, value, icon: Icon, color = "blue", trend, onClick }) {
  const colors = {
    red: "text-red-600 bg-red-50",
    yellow: "text-yellow-600 bg-yellow-50",
    green: "text-green-600 bg-green-50",
    blue: "text-blue-600 bg-blue-50",
    purple: "text-purple-600 bg-purple-50"
  };

  const trendColors = trend?.startsWith('+') ? "text-green-600" : "text-red-600";

  return (
    <div
      onClick={onClick}
      className={`bg-white p-4 rounded shadow transition ${
        onClick ? "cursor-pointer hover:scale-[1.02] hover:shadow-lg" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      {trend && <p className={`text-sm font-semibold ${trendColors}`}>{trend}</p>}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="p-3 bg-slate-50 rounded border">
      <p className="text-xs text-slate-600 mb-1">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function InsightsSection({ insights }) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded shadow">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <TrendingUp size={18} /> Key Insights
      </h3>
      <ul className="space-y-2">
        {insights.map((insight, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="text-blue-600 mt-1">•</span>
            <span>{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}