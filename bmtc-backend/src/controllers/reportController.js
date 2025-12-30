const { Bus, Complaint, Shift, Driver, Conductor, Route, AccidentReport } = require("../models");
const { Op } = require("sequelize");

// Helper function to get date range
const getDateRange = (period = "month") => {
  const now = new Date();
  let startDate;
  
  switch (period) {
    case "week":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "quarter":
      const quarter = Math.floor(now.getMonth() / 3);
      startDate = new Date(now.getFullYear(), quarter * 3, 1);
      break;
    case "year":
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }
  
  return { startDate, endDate: now };
};

// Bus Usage Report
exports.getBusUsageReport = async (req, res) => {
  try {
    const { period = "month", depot } = req.query;
    const { startDate, endDate } = getDateRange(period);
    
    // Get all buses
    const allBuses = await Bus.findAll({
      where: depot ? { depot_name: depot } : {}
    });
    
    // Get shifts for the period
    const shifts = await Shift.findAll({
      where: {
        shift_date: {
          [Op.between]: [startDate, endDate]
        }
      },
      include: [{ model: Route, required: false }]
    });
    
    // Map buses with their shifts
    const buses = allBuses.map(bus => {
      const busShifts = shifts.filter(s => s.bus_id === bus.bus_id);
      return {
        ...bus.toJSON(),
        Shifts: busShifts
      };
    });
    
    // Calculate statistics
    const totalBuses = buses.length;
    const busesInUse = buses.filter(b => b.Shifts && b.Shifts.length > 0).length;
    const utilizationRate = totalBuses > 0 ? ((busesInUse / totalBuses) * 100).toFixed(2) : 0;
    
    // Group by depot
    const depotStats = {};
    buses.forEach(bus => {
      if (!depotStats[bus.depot_name]) {
        depotStats[bus.depot_name] = {
          total: 0,
          inUse: 0,
          shifts: 0
        };
      }
      depotStats[bus.depot_name].total++;
      if (bus.Shifts && bus.Shifts.length > 0) {
        depotStats[bus.depot_name].inUse++;
        depotStats[bus.depot_name].shifts += bus.Shifts.length;
      }
    });
    
    // Group by type
    const typeStats = {};
    buses.forEach(bus => {
      if (!typeStats[bus.type]) {
        typeStats[bus.type] = { total: 0, inUse: 0 };
      }
      typeStats[bus.type].total++;
      if (bus.Shifts && bus.Shifts.length > 0) {
        typeStats[bus.type].inUse++;
      }
    });
    
    // Top utilized buses
    const busUtilization = buses.map(bus => ({
      bus_id: bus.bus_id,
      registration_no: bus.registration_no,
      depot_name: bus.depot_name,
      type: bus.type,
      shifts_count: bus.Shifts ? bus.Shifts.length : 0,
      routes: [...new Set(bus.Shifts?.map(s => s.Route?.route_id).filter(Boolean) || [])]
    })).sort((a, b) => b.shifts_count - a.shifts_count).slice(0, 10);
    
    res.json({
      period,
      dateRange: { startDate, endDate },
      summary: {
        totalBuses,
        busesInUse,
        busesIdle: totalBuses - busesInUse,
        utilizationRate: `${utilizationRate}%`
      },
      byDepot: depotStats,
      byType: typeStats,
      topUtilized: busUtilization
    });
  } catch (err) {
    console.error("Error generating bus usage report:", err);
    res.status(500).json({ error: err.message });
  }
};

// Complaints Report
exports.getComplaintsReport = async (req, res) => {
  try {
    const { period = "month", status } = req.query;
    const { startDate, endDate } = getDateRange(period);
    
    const whereClause = {
      complaint_date: {
        [Op.between]: [startDate, endDate]
      }
    };
    
    if (status) {
      whereClause.status = status;
    }
    
    const complaints = await Complaint.findAll({
      where: whereClause,
      include: [Driver, Bus]
    });
    
    // Status breakdown
    const statusBreakdown = {};
    complaints.forEach(complaint => {
      statusBreakdown[complaint.status] = (statusBreakdown[complaint.status] || 0) + 1;
    });
    
    // Complaints by bus
    const busComplaints = {};
    complaints.forEach(complaint => {
      if (complaint.Bus) {
        const busId = complaint.Bus.bus_id;
        if (!busComplaints[busId]) {
          busComplaints[busId] = {
            registration_no: complaint.Bus.registration_no,
            count: 0,
            statuses: {}
          };
        }
        busComplaints[busId].count++;
        busComplaints[busId].statuses[complaint.status] = 
          (busComplaints[busId].statuses[complaint.status] || 0) + 1;
      }
    });
    
    // Complaints by driver
    const driverComplaints = {};
    complaints.forEach(complaint => {
      if (complaint.Driver) {
        const driverId = complaint.Driver.driver_id;
        if (!driverComplaints[driverId]) {
          driverComplaints[driverId] = {
            name: complaint.Driver.name,
            count: 0,
            statuses: {}
          };
        }
        driverComplaints[driverId].count++;
        driverComplaints[driverId].statuses[complaint.status] = 
          (driverComplaints[driverId].statuses[complaint.status] || 0) + 1;
      }
    });
    
    // Monthly trend (last 6 months)
    const monthlyTrend = {};
    complaints.forEach(complaint => {
      const month = new Date(complaint.complaint_date).toLocaleString('default', { month: 'short', year: 'numeric' });
      monthlyTrend[month] = (monthlyTrend[month] || 0) + 1;
    });
    
    res.json({
      period,
      dateRange: { startDate, endDate },
      summary: {
        total: complaints.length,
        pending: statusBreakdown["Pending"] || 0,
        resolved: statusBreakdown["Resolved"] || 0,
        inProgress: statusBreakdown["In Progress"] || 0
      },
      statusBreakdown,
      byBus: Object.values(busComplaints).sort((a, b) => b.count - a.count).slice(0, 10),
      byDriver: Object.values(driverComplaints).sort((a, b) => b.count - a.count).slice(0, 10),
      monthlyTrend
    });
  } catch (err) {
    console.error("Error generating complaints report:", err);
    res.status(500).json({ error: err.message });
  }
};

// Shift Compliance Report
exports.getShiftComplianceReport = async (req, res) => {
  try {
    const { period = "month" } = req.query;
    const { startDate, endDate } = getDateRange(period);
    
    const shifts = await Shift.findAll({
      where: {
        shift_date: {
          [Op.between]: [startDate, endDate]
        }
      },
      include: [Driver, Conductor, Bus, Route]
    });
    
    const totalShifts = shifts.length;
    
    // Shifts with all assignments (driver, conductor, bus, route)
    const completeShifts = shifts.filter(s => 
      s.Driver && s.Conductor && s.Bus && s.Route
    ).length;
    
    const complianceRate = totalShifts > 0 ? ((completeShifts / totalShifts) * 100).toFixed(2) : 0;
    
    // Shifts by driver
    const driverShifts = {};
    shifts.forEach(shift => {
      if (shift.Driver) {
        const driverId = shift.Driver.driver_id;
        if (!driverShifts[driverId]) {
          driverShifts[driverId] = {
            name: shift.Driver.name,
            total: 0,
            complete: 0
          };
        }
        driverShifts[driverId].total++;
        if (shift.Conductor && shift.Bus && shift.Route) {
          driverShifts[driverId].complete++;
        }
      }
    });
    
    // Shifts by conductor
    const conductorShifts = {};
    shifts.forEach(shift => {
      if (shift.Conductor) {
        const conductorId = shift.Conductor.conductor_id;
        if (!conductorShifts[conductorId]) {
          conductorShifts[conductorId] = {
            name: shift.Conductor.name,
            total: 0
          };
        }
        conductorShifts[conductorId].total++;
      }
    });
    
    // Shifts by route
    const routeShifts = {};
    shifts.forEach(shift => {
      if (shift.Route) {
        const routeId = shift.Route.route_id;
        if (!routeShifts[routeId]) {
          routeShifts[routeId] = {
            route: `${shift.Route.start_point} → ${shift.Route.end_point}`,
            total: 0
          };
        }
        routeShifts[routeId].total++;
      }
    });
    
    // Daily coverage
    const dailyCoverage = {};
    shifts.forEach(shift => {
      const date = new Date(shift.shift_date).toISOString().split('T')[0];
      if (!dailyCoverage[date]) {
        dailyCoverage[date] = 0;
      }
      dailyCoverage[date]++;
    });
    
    // Missing assignments
    const missingAssignments = {
      noDriver: shifts.filter(s => !s.Driver).length,
      noConductor: shifts.filter(s => !s.Conductor).length,
      noBus: shifts.filter(s => !s.Bus).length,
      noRoute: shifts.filter(s => !s.Route).length
    };
    
    res.json({
      period,
      dateRange: { startDate, endDate },
      summary: {
        totalShifts,
        completeShifts,
        incompleteShifts: totalShifts - completeShifts,
        complianceRate: `${complianceRate}%`,
        missingAssignments
      },
      byDriver: Object.values(driverShifts)
        .sort((a, b) => b.total - a.total)
        .map(d => ({
          ...d,
          complianceRate: d.total > 0 ? ((d.complete / d.total) * 100).toFixed(2) + "%" : "0%"
        }))
        .slice(0, 10),
      byConductor: Object.values(conductorShifts)
        .sort((a, b) => b.total - a.total)
        .slice(0, 10),
      byRoute: Object.values(routeShifts)
        .sort((a, b) => b.total - a.total)
        .slice(0, 10),
      dailyCoverage
    });
  } catch (err) {
    console.error("Error generating shift compliance report:", err);
    res.status(500).json({ error: err.message });
  }
};

// Combined Summary Report
exports.getSummaryReport = async (req, res) => {
  try {
    const { period = "month" } = req.query;
    const { startDate, endDate } = getDateRange(period);
    
    const [buses, complaints, shifts, accidents] = await Promise.all([
      Bus.findAll(),
      Complaint.findAll({
        where: {
          complaint_date: { [Op.between]: [startDate, endDate] }
        }
      }),
      Shift.findAll({
        where: {
          shift_date: { [Op.between]: [startDate, endDate] }
        },
        include: [Driver, Conductor, Bus, Route]
      }),
      AccidentReport.findAll({
        where: {
          accident_date: { [Op.between]: [startDate, endDate] }
        }
      })
    ]);
    
    const busUtilization = buses.filter(b => 
      shifts.some(s => s.bus_id === b.bus_id)
    ).length;
    
    res.json({
      period,
      dateRange: { startDate, endDate },
      generatedAt: new Date(),
      overview: {
        totalBuses: buses.length,
        activeBuses: busUtilization,
        totalComplaints: complaints.length,
        pendingComplaints: complaints.filter(c => c.status === "Pending").length,
        totalShifts: shifts.length,
        totalAccidents: accidents.length
      },
      keyMetrics: {
        busUtilizationRate: buses.length > 0 ? ((busUtilization / buses.length) * 100).toFixed(2) + "%" : "0%",
        complaintResolutionRate: complaints.length > 0 
          ? ((complaints.filter(c => c.status === "Resolved").length / complaints.length) * 100).toFixed(2) + "%"
          : "0%",
        shiftComplianceRate: shifts.length > 0
          ? ((shifts.filter(s => s.Driver && s.Conductor && s.Bus && s.Route).length / shifts.length) * 100).toFixed(2) + "%"
          : "0%"
      }
    });
  } catch (err) {
    console.error("Error generating summary report:", err);
    res.status(500).json({ error: err.message });
  }
};

