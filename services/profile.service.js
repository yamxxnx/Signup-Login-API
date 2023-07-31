const User = require("../database/user");

exports.findUserByEmail = async function (email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    console.error("Error finding user by email:", err);
    throw err;
  }
};
