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
    const data = await Complaint.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
