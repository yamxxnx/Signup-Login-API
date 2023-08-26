const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  loggedInAt: { type: Date, required: true },
  loggedOutAt: { type: Date },
  status: { type: String, required: true },
  username: String,
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
