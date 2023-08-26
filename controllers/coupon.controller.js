const Coupon = require("../database/coupon");

exports.getCouponManagementPage = (req, res) => {
  res.render("coupon_management.ejs");
};

exports.addCoupon = async (req, res) => {
  try {
    const { offerName, couponCode, couponType, startDate, endDate, isActive } =
      req.body;

    const newCoupon = new Coupon({
      offerName,
      couponCode,
      couponType,
      startDate,
      endDate,
      status: isActive ? "Active" : "Inactive",
    });

    const savedCoupon = await newCoupon.save();

    res
      .status(200)
      .json({ message: "Coupon added successfully!", coupon: savedCoupon });
  } catch (error) {
    console.error("Error adding coupon:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the coupon." });
  }
};

exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).exec();
    res.status(200).json(coupons);
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the coupons." });
  }
};
