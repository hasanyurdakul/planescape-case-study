const User = require("../models/userModel");

const getUserFlights = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId);
    // Kullanıcıyı bul ve flights alanını populate et
    const user = await User.findById(userId).populate("flights");

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    res.status(200).json({ status: true, flights: user.flights });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

const removeFlight = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { _id: flightId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const flightIndex = user.flights.indexOf(flightId);
    if (flightIndex > -1) {
      user.flights.splice(flightIndex, 1);
      await user.save();
      return res.status(200).json({ message: "Flight removed from user" });
    }

    res.status(404).json({ message: "Flight not found in user's list" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error removing flight", error: err.message });
  }
};

module.exports = { getUserFlights, removeFlight };
