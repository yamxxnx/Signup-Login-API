const User = require("../database/user");

exports.findUserByEmail = async function (email) {
  try {
    return await User.findOne({ email });
  } catch (err) {
    console.error("Error finding user by email:", err);
    throw err;
  }
};
