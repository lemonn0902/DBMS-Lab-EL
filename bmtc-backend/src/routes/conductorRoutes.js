const express = require("express");
const router = express.Router();
const controller = require("../controllers/conductorController");

router.get("/", controller.getConductors);
router.get("/:id", controller.getConductorById);
router.post("/", controller.createConductor);
router.put("/:id", controller.updateConductor);
router.delete("/:id", controller.deleteConductor);

module.exports = router;
