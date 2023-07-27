const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  unique_id: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  passwordConf: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;