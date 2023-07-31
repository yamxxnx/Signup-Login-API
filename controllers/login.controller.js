const authService = require("../services/auth.service");
const bcrypt = require("bcrypt");
const userService = require("../services/user.service");

exports.loginUser = async function (req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await userService.findUserByEmail(email);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = authService.generateToken(user._id);

        req.session.token = token;

        return res.send({ Success: "Success!", token });
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
