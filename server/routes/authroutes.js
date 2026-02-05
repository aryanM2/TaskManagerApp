const register = require("../controllers/authController").register;
const login = require("../controllers/authController").login;
const express = require("express");
const router = express.Router();

// Registration Route
router.post("/register", register);
// Login Route
router.post("/login", login);
module.exports = router;
