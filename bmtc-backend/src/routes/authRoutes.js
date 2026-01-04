const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Admin routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// User routes
router.post("/user/signup", authController.userSignup);
router.post("/user/login", authController.userLogin);

module.exports = router;
