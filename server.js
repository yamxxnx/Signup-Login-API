const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env
const ejs = require('ejs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { connectToDB } = require('./database/db'); // Import the db.js from the database folder
const mongoose = require('mongoose');
// Call the function to connect to MongoDB
connectToDB().then(() => {
  // Set up session middleware after the database connection is established
  app.use(
    session({
      secret: 'work hard',
      resave: true,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection, // Use the mongoose connection from the db.js file
      }),
    })
  );

  // Rest of the server setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(express.static(__dirname + '/views'));

  var index = require('./routes/index');
  app.use('/', index);

  app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, function () {
    console.log('Server is started on http://127.0.0.1:' + PORT);
  });
}).catch(err => {
  console.error('Error in MongoDB connection:', err);
});