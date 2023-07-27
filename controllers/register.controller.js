const userService = require('../services/user.service');

exports.registerUser = async function (req, res, next) {
  const personInfo = req.body;

  if (
    !personInfo.email ||
    !personInfo.username ||
    !personInfo.password ||
    !personInfo.passwordConf
  ) {
    return res.send({ Error: "All fields are required." });
  }

  if (personInfo.password !== personInfo.passwordConf) {
    return res.send({ Error: "Passwords do not match." });
  }

  try {
    const emailExists = await userService.checkIfEmailExists(personInfo.email);
    if (emailExists) {
      return res.send({ Error: "Email is already in use." });
    }

    const savedUser = await userService.registerUser(personInfo);
    console.log("User registration successful:", savedUser);
    return res.send({ Success: "You are registered, You can login now." });
  } catch (err) {
    console.error('Error during user registration:', err);
    return res.send({ Error: "Error occurred during registration." });
  }
};

exports.index_get = function (req, res, next) {
  return res.render("index.ejs");
};