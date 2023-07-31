const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register.controller");
const loginController = require("../controllers/login.controller");
const logoutController = require("../controllers/logout.controller");
const profileController = require("../controllers/profile.controller");
const { authenticate } = require("../middleware/auth.middleware");

router.get("/", registerController.index_get);
router.post("/", registerController.registerUser);
router.get("/login", loginController.login_get);
router.post("/login", loginController.loginUser);
router.get("/profile", authenticate, profileController.getUserProfile);
router.get("/logout", logoutController.logoutUser);

module.exports = router;
