const profileService = require("../services/profile.service");

exports.getUserProfile = async function (req, res, next) {
  try {
    const userId = req.session.userId;
    const userData = await profileService.getUserProfile(userId);

    if (!userData) {
      return res.redirect("/");
    }

    return res.render("data.ejs", {
      name: userData.username,
      email: userData.email,
    });
  } catch (err) {
    console.error("Error getting user profile:", err);
    return res.send({ Error: "Error occurred while fetching user profile." });
  }
};
