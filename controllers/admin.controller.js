const User = require("../database/user");

exports.registerAdmin = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const existingAdmin = await User.findOne({ email, userType: "ADMIN" });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists." });
    }

    const admin = new User({
      username,
      email,
      password,
      userType: "ADMIN",
    });

    await admin.save();

    return res.status(201).json({ message: "Admin registration successful." });
  } catch (error) {
    console.error("Error during admin registration:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
