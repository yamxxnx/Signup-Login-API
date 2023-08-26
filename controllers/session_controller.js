const Session = require("../database/session");
const User = require("../database/user");

exports.getAllSessions = async (req, res) => {
  // console.log("Getting sessions data...");
  try {
    const sessions = await Session.find().populate("userId");

    // console.log(sessions);
    const formattedSessions = sessions.map((session) => ({
      _id: session._id,
      userId: session.userId ? session.userId._id : "N/A",
      username: session.userId.username,
      loggedInAt: session.loggedInAt,
      loggedOutAt: session.loggedOutAt,
      status: session.status,
    }));
    // console.log("Sessions data:", formattedSessions);
    res.json(formattedSessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.renderSessionManagement = async (req, res) => {
  try {
    const sessions = await Session.find().populate("userId");
    res.render("sessions", { sessions: sessions });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
