const express = require("express");
const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// ROUTES
app.use("/api/drivers", require("./routes/driverRoutes"));
app.use("/api/conductors", require("./routes/conductorRoutes"));
app.use("/api/buses", require("./routes/busRoutes"));
app.use("/api/routes", require("./routes/routeRoutes"));
app.use("/api/shifts", require("./routes/shiftRoutes"));
app.use("/api/complaints", require("./routes/complaintRoutes"));
app.use("/api/accidents", require("./routes/accidentReportRoutes"));

module.exports = app;
