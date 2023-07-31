const bcrypt = require("bcrypt");
const User = require("../database/user");

exports.registerUser = async function (personInfo) {
  const { email, username, password } = personInfo;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    console.error("Error while registering user:", err);
    throw err;
  }
};

exports.findUserByEmail = async function (email) {
  try {
    const existingUser = await User.findOne({ email });
    return existingUser;
  } catch (err) {
    console.error("Error checking if email exists:", err);
    throw err;
  }
};

exports.findUserById = async function (userId) {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    console.error("Error finding user by ID:", err);
    throw err;
  }
};
