const express = require("express");
const router = express.Router();
const controller = require("../controllers/complaintController");

router.get("/", controller.getComplaints);
router.get("/:id", controller.getComplaintById);
router.post("/", controller.createComplaint);
router.put("/:id", controller.updateComplaint);
router.delete("/:id", controller.deleteComplaint);

module.exports = router;
