const mongoose = require('mongoose');

exports.connectToDB = async function () {
  try {
    await mongoose.connect("mongodb+srv://yamxxnx:Yamaan@2001@cluster0.4egtosa.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connection Succeeded.');
  } catch (err) {
    console.log('Error in DB connection : ' + err);
    throw err;
  }
};