const { AccidentReport, Driver, Bus, Route } = require("../models");

exports.getAccidents = async (req, res) => {
  try {
    const data = await AccidentReport.findAll({
      include: [Driver, Bus, Route]
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAccidentById = async (req, res) => {
  try {
    const data = await AccidentReport.findByPk(req.params.id, {
      include: [Driver, Bus, Route]
    });
    if (!data) return res.status(404).json({ error: "Accident report not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAccident = async (req, res) => {
  try {
    console.log("Received accident data:", req.body);
    
    // Validate required fields
    if (!req.body.accident_id) {
      return res.status(400).json({ error: "Accident ID is required" });
    }
    
    const data = await AccidentReport.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    console.error("Error creating accident:", err);
    
    // Handle Sequelize validation errors
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: "Validation error", 
        details: err.errors.map(e => e.message).join(', ')
      });
    }
    
    // Handle unique constraint errors
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        error: "Accident ID already exists" 
      });
    }
    
    // Handle foreign key constraint errors
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ 
        error: "Invalid reference: Driver, Bus, or Route ID does not exist" 
      });
    }
    
    res.status(500).json({ 
      error: err.message || "Internal server error",
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

exports.updateAccident = async (req, res) => {
  try {
    const data = await AccidentReport.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Accident report not found" });
    await data.update(req.body);
    res.json({ message: "Accident report updated", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAccident = async (req, res) => {
  try {
    const data = await AccidentReport.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Accident report not found" });
    await data.destroy();
    res.json({ message: "Accident report deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
