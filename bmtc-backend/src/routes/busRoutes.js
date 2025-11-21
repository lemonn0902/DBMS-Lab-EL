const express = require("express");
const router = express.Router();
const controller = require("../controllers/busController");

router.get("/", controller.getBuses);
router.get("/:id", controller.getBusById);
router.post("/", controller.createBus);
router.put("/:id", controller.updateBus);
router.delete("/:id", controller.deleteBus);

module.exports = router;
