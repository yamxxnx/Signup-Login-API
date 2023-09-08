exports.validateToken = (req, res) => {
  return res.status(200).json({ message: "Token is valid." });
};
