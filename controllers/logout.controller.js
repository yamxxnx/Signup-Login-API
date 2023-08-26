const Session = require('../database/session');

exports.logoutUser = async function (req, res, next) {
  try {
    // console.log("Logout endpoint accessed.");
    // console.log("Session data in logout:", req.session);
    // console.log("User ID:", req.userId);
    // console.log("Token:", req.session.token);
    if (req.session) {
      const userId = req.userId; 
      const activeSession = await Session.findOne({ userId: userId, status: 'Active' });

      if (activeSession) {
        console.log("Active session found:", activeSession);
        activeSession.status = 'Inactive';
        activeSession.loggedOutAt = new Date();
        console.log("Updated activeSession:", activeSession);
        await activeSession.save();
      }

      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect("/login");
        }
      });
    }
  } catch (error) {
    console.error("Error during logout:", error);
    return res.send({ Error: "Error occurred during logout." });
  }
};
