const express = require("express");
const router = express.Router();
const controller = require("../controllers/routeController");

router.get("/", controller.getRoutes);
router.get("/:id", controller.getRouteById);
router.post("/", controller.createRoute);
router.put("/:id", controller.updateRoute);
router.delete("/:id", controller.deleteRoute);

module.exports = router;
