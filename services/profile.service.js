const User = require("../database/user");

exports.getUserProfile = async function (userId) {
  try {
    return await User.findOne({ unique_id: userId });
  } catch (err) {
    console.error("Error finding user profile:", err);
    throw err;
  }
};
