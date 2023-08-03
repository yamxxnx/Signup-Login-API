const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  offerName: { type: String, required: true },
  couponCode: { type: String, required: true },
  couponType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, required: true },
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;