const loginService = require("../services/login.service");

exports.loginUser = async function (req, res, next) {
  try {
    const user = await loginService.findUserByEmail(req.body.email);

    if (user) {
      if (user.password === req.body.password) {
        req.session.userId = user.unique_id;
        return res.send({ Success: "Success!" });
      } else {
        return res.send({ Success: "Wrong password!" });
      }
    } else {
      return res.send({ Success: "This Email Is not registered!" });
    }
  } catch (err) {
    console.error("Error during user login:", err);
    return res.send({ Error: "Error occurred during login." });
  }
};

exports.login_get = function (req, res, next) {
  return res.render("login.ejs");
};
