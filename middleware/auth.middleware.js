const authService = require("../services/auth.service");

exports.authenticate = function (req, res, next) {
  try {
    // console.log("Session data:", req.session);
    const token = req.session.token;
    // console.log("Token in session:", req.session.token);

    if (!token) {
      return res.status(401).send({ Error: "Authentication token missing." });
    }

    const userId = authService.verifyToken(token);

    req.userId = userId;
    // console.log("Decoded userId:", userId);

    next();
  } catch (err) {
    console.error("Error during authentication:", err);
    return res.status(401).send({ Error: "Invalid or expired token." });
  }
};
