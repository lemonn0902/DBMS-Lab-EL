const { Driver } = require("../models");

exports.getDrivers = async (req, res) => {
  try {
    const data = await Driver.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDriverById = async (req, res) => {
  try {
    const data = await Driver.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Driver not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDriver = async (req, res) => {
  try {
    const data = await Driver.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDriver = async (req, res) => {
  try {
    const data = await Driver.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Driver not found" });
    await data.update(req.body);
    res.json({ message: "Driver updated", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDriver = async (req, res) => {
  try {
    const data = await Driver.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Driver not found" });
    await data.destroy();
    res.json({ message: "Driver deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
