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
    const data = await AccidentReport.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
