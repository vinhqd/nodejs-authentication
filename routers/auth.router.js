const express = require("express");
const router = express.Router();

// controller
const authController = require("../controller/auth.controller");

// validate
const authValidate = require("../validates/auth.validate");

// middlewere
const authMiddlewere = require("../middleweres/auth.middlewere");

router.get("/login", authController.getPage);
router.post(
  "/login",
  authValidate.checkValidate,
  authMiddlewere.checkLogin,
  authController.post
);

module.exports = router;
