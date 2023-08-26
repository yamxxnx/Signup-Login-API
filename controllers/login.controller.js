const authService = require("../services/auth.service");
const bcrypt = require("bcrypt");
const userService = require("../services/user.service");
const Session = require("../database/session");

exports.loginUser = async function (req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await userService.findUserByEmail(email);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = authService.generateToken(user._id);

        const session = new Session({
          userId: user._id,
          token: token,
          loggedInAt: new Date(),
          status: "Active",
          username: user.username,
        });

        try {
          await session.save();
          req.session.token = token;
          return res.send({ Success: "Success!", token });
        } catch (error) {
          console.error("Error creating session:", error);
          return res.send({ Error: "Error occurred during login." });
        }
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
