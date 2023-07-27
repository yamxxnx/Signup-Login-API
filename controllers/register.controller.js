const User = require("../database/user");

exports.registerUser = function (req, res, next) {
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

  User.findOne({ email: personInfo.email }, function (err, data) {
    if (err) {
      console.error(err);
      return res.send({ Error: "Error occurred during registration." });
    }

    if (data) {
      return res.send({ Error: "Email is already in use." });
    }

    User.findOne({}, function (err, data) {
      let c = 1;
      if (data) {
        c = data.unique_id + 1;
      }

      const newPerson = new User({
        unique_id: c,
        email: personInfo.email,
        username: personInfo.username,
        password: personInfo.password,
        passwordConf: personInfo.passwordConf,
      });

      newPerson.save(function (err, savedUser) {
        if (err) {
          console.error(err);
          return res.send({ Error: "Error occurred during registration." });
        }

        console.log("User registration successful:", savedUser);
        return res.send({ Success: "You are registered, You can login now." });
      });
    });
  });
};

exports.index_get = function (req, res, next) {
  return res.render("index.ejs");
};
