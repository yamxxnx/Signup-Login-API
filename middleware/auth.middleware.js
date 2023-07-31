const authService = require("../services/auth.service");

exports.authenticate = function (req, res, next) {
  try {
    const token = req.session.token;

    if (!token) {
      return res.status(401).send({ Error: "Authentication token missing." });
    }

    const userId = authService.verifyToken(token);

    req.userId = userId;

    next();
  } catch (err) {
    console.error("Error during authentication:", err);
    return res.status(401).send({ Error: "Invalid or expired token." });
  }
};
