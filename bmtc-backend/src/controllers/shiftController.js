const { Shift, Driver, Conductor, Bus, Route } = require("../models");

exports.getShifts = async (req, res) => {
  try {
    const data = await Shift.findAll({
      include: [Driver, Conductor, Bus, Route]  // join linked tables
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getShiftById = async (req, res) => {
  try {
    const data = await Shift.findByPk(req.params.id, {
      include: [Driver, Conductor, Bus, Route]
    });
    if (!data) return res.status(404).json({ error: "Shift not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createShift = async (req, res) => {
  try {
    const data = await Shift.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateShift = async (req, res) => {
  try {
    const data = await Shift.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Shift not found" });
    await data.update(req.body);
    res.json({ message: "Shift updated", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteShift = async (req, res) => {
  try {
    const data = await Shift.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Shift not found" });
    await data.destroy();
    res.json({ message: "Shift deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
