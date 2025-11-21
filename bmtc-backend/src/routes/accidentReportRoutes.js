const express = require("express");
const router = express.Router();
const controller = require("../controllers/accidentReportController");

router.get("/", controller.getAccidents);
router.get("/:id", controller.getAccidentById);
router.post("/", controller.createAccident);
router.put("/:id", controller.updateAccident);
router.delete("/:id", controller.deleteAccident);

module.exports = router;
