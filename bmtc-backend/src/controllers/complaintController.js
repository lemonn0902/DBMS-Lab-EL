const { Complaint, Driver, Bus } = require("../models");

exports.getComplaints = async (req, res) => {
  try {
    const data = await Complaint.findAll({
      include: [Driver, Bus]
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getComplaintById = async (req, res) => {
  try {
    const data = await Complaint.findByPk(req.params.id, {
      include: [Driver, Bus]
    });
    if (!data) return res.status(404).json({ error: "Complaint not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createComplaint = async (req, res) => {
  try {
    console.log("Received complaint data:", req.body);
    
    // Validate required fields
    if (!req.body.complaint_id) {
      return res.status(400).json({ error: "Complaint ID is required" });
    }
    
    const data = await Complaint.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    console.error("Error creating complaint:", err);
    
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
        error: "Complaint ID already exists" 
      });
    }
    
    // Handle foreign key constraint errors
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ 
        error: "Invalid reference: Driver or Bus ID does not exist" 
      });
    }
    
    res.status(500).json({ 
      error: err.message || "Internal server error",
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const data = await Complaint.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Complaint not found" });
    await data.update(req.body);
    res.json({ message: "Complaint updated", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    const data = await Complaint.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Complaint not found" });
    await data.destroy();
    res.json({ message: "Complaint deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
