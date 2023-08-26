const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register.controller");
const loginController = require("../controllers/login.controller");
const logoutController = require("../controllers/logout.controller");
const profileController = require("../controllers/profile.controller");
const { authenticate } = require("../middleware/auth.middleware");
const couponController = require("../controllers/coupon.controller");
const Coupon = require("../database/coupon");
const sessionController = require("../controllers/session_controller");
const User = require("../database/user");
const Session = require("../database/session");

router.get("/", registerController.index_get);
router.post("/", registerController.registerUser);
router.get("/login", loginController.login_get);
router.post("/login", loginController.loginUser);
router.get("/profile", authenticate, profileController.getUserProfile);

router.get("/sessions", sessionController.renderSessionManagement);
router.get("/sessions", sessionController.getAllSessions);

router.get("/coupon-management", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.render("coupon_management", { coupons: coupons });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/add-coupon", authenticate, couponController.addCoupon);
router.get("/get-coupons", authenticate, couponController.getAllCoupons);

router.get("/logout", authenticate, logoutController.logoutUser);
// router.get("/logout", logoutController.logoutUser);
// router.get("/logout", logoutController.logoutUser);
router.post("/add-coupon", couponController.addCoupon);
router.get("/get-coupons", couponController.getAllCoupons);

module.exports = router;
