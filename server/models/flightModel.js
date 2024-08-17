const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightName: {
    type: String,
  },
  flightNumber: {
    type: Number,
  },
  departureLocation: {
    type: String,
  },
  arrivalLocation: {
    type: String,
  },
  flightDepartureTime: {
    type: String,
  },
  flightArrivalTime: {
    type: String,
  },
  departureAirportName: {
    type: String,
  },
  arrivalAirportName: {
    type: String,
  },
  airlineName: {
    type: String,
  },
  timespan: {
    hours: {
      type: Number,
    },
    minutes: {
      type: Number,
    },
  },
  routeLength: {
    type: String,
  },
  ticketPrice: {
    type: Number,
  },
});

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
