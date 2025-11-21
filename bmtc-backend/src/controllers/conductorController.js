const { Conductor } = require("../models");

exports.getConductors = async (req, res) => {
  try {
    const data = await Conductor.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getConductorById = async (req, res) => {
  try {
    const data = await Conductor.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Conductor not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createConductor = async (req, res) => {
  try {
    const data = await Conductor.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateConductor = async (req, res) => {
  try {
    const data = await Conductor.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Conductor not found" });
    await data.update(req.body);
    res.json({ message: "Conductor updated", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteConductor = async (req, res) => {
  try {
    const data = await Conductor.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Conductor not found" });
    await data.destroy();
    res.json({ message: "Conductor deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
