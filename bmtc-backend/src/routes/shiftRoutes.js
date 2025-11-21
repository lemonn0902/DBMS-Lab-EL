const express = require("express");
const router = express.Router();
const controller = require("../controllers/shiftController");

router.get("/", controller.getShifts);
router.get("/:id", controller.getShiftById);
router.post("/", controller.createShift);
router.put("/:id", controller.updateShift);
router.delete("/:id", controller.deleteShift);

module.exports = router;
