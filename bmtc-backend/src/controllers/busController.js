const { Bus } = require("../models");

exports.getBuses = async (req, res) => {
  try {
    const data = await Bus.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBusById = async (req, res) => {
  try {
    const data = await Bus.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Bus not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBus = async (req, res) => {
  try {
    const data = await Bus.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBus = async (req, res) => {
  try {
    const data = await Bus.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Bus not found" });
    await data.update(req.body);
    res.json({ message: "Bus updated", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBus = async (req, res) => {
  try {
    const data = await Bus.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Bus not found" });
    await data.destroy();
    res.json({ message: "Bus deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
