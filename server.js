var express = require("express");

const dotenv = require("dotenv");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var dbController = require("./routes/controllers/db.controller");

dotenv.config();
dbController
  .connectToDB()
  .then((db) => {
    app.use(
      session({
        secret: "work hard",
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({
          mongooseConnection: db,
        }),
      })
    );

    startServer();
  })
  .catch((err) => {
    console.error("Error in MongoDB connection:", err);
  });
  
function startServer() {
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(express.static(__dirname + "/views"));

  var index = require("./routes/index");
  app.use("/", index);

  app.use(function (req, res, next) {
    var err = new Error("File Not Found");
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, function () {
    console.log("Server is started on http://127.0.0.1:" + PORT);
  });
}
