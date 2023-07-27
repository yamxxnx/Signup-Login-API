var User = require("../database/user");

exports.loginUser = function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, data) {
    if (data) {
      if (data.password == req.body.password) {
        req.session.userId = data.unique_id;
        res.send({ Success: "Success!" });
      } else {
        res.send({ Success: "Wrong password!" });
      }
    } else {
      res.send({ Success: "This Email Is not registered!" });
    }
  });
};

exports.login_get = function (req, res, next) {
  return res.render("login.ejs");
};
