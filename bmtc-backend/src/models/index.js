"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const basename = path.basename(__filename);
const db = {};

// Load all models dynamically
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// ---- ASSOCIATIONS ----
const {
  Driver,
  Conductor,
  Bus,
  Route,
  Shift,
  Complaint,
  AccidentReport
} = db;

// DRIVER → SHIFT
Driver.hasMany(Shift, { foreignKey: "driver_id" });
Shift.belongsTo(Driver, { foreignKey: "driver_id" });

// CONDUCTOR → SHIFT
Conductor.hasMany(Shift, { foreignKey: "conductor_id" });
Shift.belongsTo(Conductor, { foreignKey: "conductor_id" });

// BUS → SHIFT
Bus.hasMany(Shift, { foreignKey: "bus_id" });
Shift.belongsTo(Bus, { foreignKey: "bus_id" });

// ROUTE → SHIFT
Route.hasMany(Shift, { foreignKey: "route_id" });
Shift.belongsTo(Route, { foreignKey: "route_id" });

// DRIVER → COMPLAINT
Driver.hasMany(Complaint, { foreignKey: "driver_id" });
Complaint.belongsTo(Driver, { foreignKey: "driver_id" });

// BUS → COMPLAINT
Bus.hasMany(Complaint, { foreignKey: "bus_id" });
Complaint.belongsTo(Bus, { foreignKey: "bus_id" });

// DRIVER → ACCIDENT REPORT
Driver.hasMany(AccidentReport, { foreignKey: "driver_id" });
AccidentReport.belongsTo(Driver, { foreignKey: "driver_id" });

// BUS → ACCIDENT REPORT
Bus.hasMany(AccidentReport, { foreignKey: "bus_id" });
AccidentReport.belongsTo(Bus, { foreignKey: "bus_id" });

// ROUTE → ACCIDENT REPORT
Route.hasMany(AccidentReport, { foreignKey: "route_id" });
AccidentReport.belongsTo(Route, { foreignKey: "route_id" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
