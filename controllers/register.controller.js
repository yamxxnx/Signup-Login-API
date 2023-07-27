const User = require('../database/user');

exports.registerUser = function (req, res, next) {
  // Controller code for user registration, validation, and saving to the database (no DB operations here)
  const personInfo = req.body;

  // Check if all required fields are provided
  if (!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf) {
    return res.send({ "Error": "All fields are required." });
  }

  // Check if the password and passwordConf match
  if (personInfo.password !== personInfo.passwordConf) {
    return res.send({ "Error": "Passwords do not match." });
  }

  // Check if the email is already registered
  User.findOne({ email: personInfo.email }, function (err, data) {
    if (err) {
      console.error(err);
      return res.send({ "Error": "Error occurred during registration." });
    }

    if (data) {
      return res.send({ "Error": "Email is already in use." });
    }

    // If email is not registered, proceed with user registration
    User.findOne({}, function (err, data) {
      let c = 1;
      if (data) {
        c = data.unique_id + 1;
      }

      // Create a new user object
      const newPerson = new User({
        unique_id: c,
        email: personInfo.email,
        username: personInfo.username,
        password: personInfo.password,
        passwordConf: personInfo.passwordConf
      });

      // Save the new user to the database
      newPerson.save(function (err, savedUser) {
        if (err) {
          console.error(err);
          return res.send({ "Error": "Error occurred during registration." });
        }

        console.log('User registration successful:', savedUser);
        return res.send({ "Success": "You are registered, You can login now." });
      });
    });
  });
};

exports.index_get = function (req, res, next) {
  // Controller code for rendering the registration form (no DB operations here)
  return res.render('index.ejs');
};