const User = require('../database/user');

exports.checkIfEmailExists = async function (email) {
  try {
    const existingUser = await User.findOne({ email });
    return existingUser !== null;
  } catch (err) {
    console.error('Error checking if email exists:', err);
    throw err;
  }
};

exports.registerUser = async function (personInfo) {
  try {
    let c = 1;
    const lastUser = await User.findOne({}, { unique_id: 1 }, { sort: { unique_id: -1 } });

    if (lastUser) {
      c = lastUser.unique_id + 1;
    }

    const newUser = new User({
      unique_id: c,
      email: personInfo.email,
      username: personInfo.username,
      password: personInfo.password,
      passwordConf: personInfo.passwordConf,
    });

    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    console.error('Error registering user:', err);
    throw err;
  }
};