const express = require("express");
const User = require("../models/userModel");
const Flight = require("../models/flightModel");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");
const {
  getUserFlights,
  removeFlight,
} = require("../controllers/userController");
const tokenControl = require("../middleware/auth");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(404).send({ status: false, message: "Empty Field" });
    }
    let user = await User.create(req.body);
    res.status(200).send({ status: true, message: "User Created", user: user });
  } catch (error) {
    // console.log(error)
    res.status(400).send({ status: false, message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password || username == "" || password == "") {
      return res.status(404).send({ staus: false, message: "Empty Field" });
    }
    let userFromDb = await User.findOne({ username });

    if (!userFromDb) {
      return res
        .status(404)
        .send({ status: false, message: "Username is not found" });
    }
    if (password !== userFromDb.password) {
      return res
        .status(404)
        .send({ status: false, message: "Inccorect Passoword" });
    }
    //Token İşlemi
    let access_token = jwt.sign(
      {
        userId: userFromDb.id,
        username: userFromDb.username,
        email: userFromDb.email,
      },
      process.env.MYKEY,
      { expiresIn: "2h" }
    );
    res.status(200).send({
      status: true,
      message: `Welcome ${userFromDb.username}`,
      user: {
        username: userFromDb.username,
        email: userFromDb.email,
        flights: userFromDb.flights,
      },
      access_token: access_token,
    });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
});

userRouter.get("/getAll", tokenControl, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({ status: true, message: "All Users", users: users });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
});

userRouter.post("/addFlight", tokenControl, async (req, res) => {
  const { userId } = req.user;
  const {
    flightName,
    flightNumber,
    departureLocation,
    arrivalLocation,
    flightDepartureTime,
    flightArrivalTime,
    departureAirportName,
    arrivalAirportName,
    airlineName,
    timespan,
    routeLength,
    ticketPrice,
  } = req.body;

  try {
    // Yeni uçuşu oluştur
    const newFlight = new Flight({
      flightName,
      flightNumber,
      departureLocation,
      arrivalLocation,
      flightDepartureTime,
      flightArrivalTime,
      departureAirportName,
      arrivalAirportName,
      airlineName,
      timespan,
      routeLength,
      ticketPrice,
    });

    // Uçuşu kaydet
    const savedFlight = await newFlight.save();

    // Kullanıcının uçuşlarına bu uçuşu ekle
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { flights: savedFlight._id } },
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Flight added successfully",
      flight: savedFlight,
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

userRouter.get("/flights", tokenControl, getUserFlights);
userRouter.post("/flights/remove", tokenControl, removeFlight);

module.exports = userRouter;
