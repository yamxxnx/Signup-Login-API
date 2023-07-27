var express = require("express");
var router = express.Router();
var registerController = require("../controllers/register.controller");
var loginController = require("../controllers/login.controller");
var logoutController = require("../controllers/logout.controller");
var profileController = require("../controllers/profile.controller");

router.get("/", registerController.index_get);

router.post("/", registerController.registerUser);

router.get("/login", loginController.login_get);

router.post("/login", loginController.loginUser);

router.get("/profile", profileController.getUserProfile);

router.get("/logout", logoutController.logoutUser);

module.exports = router;
