const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

exports.generateToken = function (userId) {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

exports.verifyToken = function (token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    throw err;
  }
};
