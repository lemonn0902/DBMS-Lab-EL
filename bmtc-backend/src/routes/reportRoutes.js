const express = require("express");
const router = express.Router();
const controller = require("../controllers/reportController");

router.get("/bus-usage", controller.getBusUsageReport);
router.get("/complaints", controller.getComplaintsReport);
router.get("/shift-compliance", controller.getShiftComplianceReport);
router.get("/summary", controller.getSummaryReport);

module.exports = router;








