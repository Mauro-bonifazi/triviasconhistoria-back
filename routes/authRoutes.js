const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// Ruta para el login
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
