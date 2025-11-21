const { Route } = require("../models");

exports.getRoutes = async (req, res) => {
  try {
    const data = await Route.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRouteById = async (req, res) => {
  try {
    const data = await Route.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Route not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRoute = async (req, res) => {
  try {
    const data = await Route.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRoute = async (req, res) => {
  try {
    const data = await Route.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Route not found" });
    await data.update(req.body);
    res.json({ message: "Route updated", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRoute = async (req, res) => {
  try {
    const data = await Route.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: "Route not found" });
    await data.destroy();
    res.json({ message: "Route deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
