const mongoose = require("mongoose");

exports.connectToDB = function () {
  return mongoose
    .connect(
      "mongodb+srv://yamxxnx:Yamaan@2001@cluster0.4egtosa.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("MongoDB Connection Succeeded.");
      return mongoose.connection;
    })
    .catch((err) => {
      console.log("Error in DB connection : " + err);
      throw err;
    });
};
