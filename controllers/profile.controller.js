const userService = require("../services/user.service");

exports.getUserProfile = async function (req, res, next) {
  try {
    const userId = req.userId;

    const user = await userService.findUserById(userId);

    if (!user) {
      return res.status(404).send({ Error: "User not found." });
    }

    return res.render("data.ejs", { name: user.username, email: user.email });
  } catch (err) {
    console.error("Error during user profile retrieval:", err);
    return res.status(401).send({ Error: "Invalid or expired session." });
  }
};
