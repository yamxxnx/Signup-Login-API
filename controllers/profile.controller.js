var User = require("../database/user");

exports.getUserProfile = function (req, res, next) {
  console.log("profile");
  User.findOne({ unique_id: req.session.userId }, function (err, data) {
    console.log("data");
    console.log(data);
    if (!data) {
      res.redirect("/");
    } else {
      return res.render("data.ejs", { name: data.username, email: data.email });
    }
  });
};
