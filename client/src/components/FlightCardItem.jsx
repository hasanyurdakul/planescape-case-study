import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import AirlinesIcon from "@mui/icons-material/Airlines";
import { FlightTakeoff, FlightLand } from "@mui/icons-material";
import FlightIcon from "@mui/icons-material/Flight";
import { dateTimeSubtractor } from "../utils/dateTimeSubtractor";
import { routeLengthParser } from "../utils/routeLengthParser";
import { airlineNameParser } from "../utils/airlineNameParser";
import { getLocationName } from "../utils/getLocationName";
import { generateRandomPrice } from "../utils/generateRandomPrice";
import axios from "axios";
import { getToken } from "../utils/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// ######################################################################
// FlightCardItem componenti, bir uçuşun detaylarını gösteren kart componentidir.
// FlightCardsWrapper componenti içinde kullanılır.
// Uçuş kartlarında uçuş bilgileri, uçuş süresi, fiyat ve book flight butonu bulunur.
// Book flight butonuna tıklandığında, kullanıcı uçuşu mongodb veritabanına kaydedebilir.
// ######################################################################

function FlightCardItem({ flight }) {
  const [loading, setLoading] = useState(true);
  const [airlineName, setAirlineName] = useState("Unknown");
  const [departureLocation, setDepartureLocation] = useState("Unknown");
  const [arrivalLocation, setArrivalLocation] = useState("Unknown");
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const nodeApiUrl = import.meta.env.VITE_NODE_API_URL;

  const departureAirportName =
    flight.flightDirection === "D"
      ? "AMS"
      : flight.route.destinations[flight.route.destinations.length - 1];

  const arrivalAirportName =
    flight.flightDirection === "D"
      ? flight.route.destinations[flight.route.destinations.length - 1]
      : "AMS";

  const routeLength = routeLengthParser(flight.route.destinations);
  useEffect(() => {
    if (flight.prefixICAO) {
      Promise.all([
        airlineNameParser(flight.prefixICAO),
        getLocationName(flight),
      ]).then(([airlineData, locationData]) => {
        setAirlineName(airlineData);
        if (flight.flightDirection === "D") {
          setDepartureLocation("Amsterdam");
          setArrivalLocation(locationData.split(",")[0] || "Unknown");
        } else {
          setArrivalLocation("Amsterdam");
          setDepartureLocation(locationData.split(",")[0] || "Unknown");
        }
        setLoading(false); // Set loading to false once data is loaded
      });
    }
  }, [flight.prefixICAO, flight.flightDirection]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <CircularProgress className="text-themePurple " size={60} />
      </div>
    );
  }

  let times = [];
  let flightArrivalTime = "";
  let flightDepartureTime = "";

  const sortAndFormatTime = (time) => {
    return time ? time.split("T")[1].split(".")[0].slice(0, 5) : "Unknown";
  };

  if (flight.flightDirection === "D") {
    times.push(flight.actualOffBlockTime, flight.scheduleDateTime);
    times = times.filter(Boolean).sort();
    flightDepartureTime = sortAndFormatTime(times[0]);
    flightArrivalTime = sortAndFormatTime(times[1]);
  } else {
    times.push(flight.scheduleDateTime, flight.estimatedLandingTime);
    times = times.filter(Boolean).sort();
    flightDepartureTime = sortAndFormatTime(times[0]);
    flightArrivalTime = sortAndFormatTime(times[1]);
  }

  const ticketPrice = generateRandomPrice();
  flight.ticketPrice = ticketPrice;

  const timeResult = dateTimeSubtractor(times[0], times[1]);

  const flightToBeSaved = {
    flightName: flight.flightName,
    flightNumber: flight.flightNumber,
    departureLocation: departureLocation,
    arrivalLocation: arrivalLocation,
    flightDepartureTime: flightDepartureTime,
    flightArrivalTime: flightArrivalTime,
    departureAirportName: departureAirportName,
    arrivalAirportName: arrivalAirportName,
    airlineName: airlineName,
    timespan: {
      hours: timeResult.hours,
      minutes: timeResult.minutes,
    },
    routeLength: routeLength,
    ticketPrice: ticketPrice,
  };

  const handleBookFlight = async () => {
    try {
      if (!isLoggedIn) {
        toast.error("Please login to book a flight");
        return;
      }
      const response = await axios
        .post(`${nodeApiUrl}/user/addFlight`, flightToBeSaved, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            toast.success("Flight added successfully");
            navigate("/myflights");
          }
        });

      console.log("Flight added successfully:", response.data);
    } catch (error) {
      console.error(
        "Error adding flight:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <div className="bg-white w-full h-full p-4 rounded-xl xl:rounded-bl-none rounded-br-none flex flex-col relative">
        {/* Header Part */}
        <div className="flex flex-col sm:flex-row justify-between">
          <h1 className="font-semibold">
            {departureLocation} - {arrivalLocation}
          </h1>
          <h1 className="font-light">{flight.flightName}</h1>
        </div>
        <Box className="mt-4 xl:mt-8 w-full flex flex-col sm:flex-row xl:justify-between xl:items-center ">
          {/* First Card */}
          <div className="flex flex-col gap-1 items-start justify-start">
            <div className="flex items-center gap-1">
              <FlightTakeoff className="text-slate-900" />
              <h1 className="text-slate-900 text-sm">Departure</h1>
            </div>
            <h1 className="font-semibold text-slate-900 text-lg sm:text-xl">
              {flightDepartureTime}
            </h1>
            <h1 className="text-slate-900 font-light text-xs sm:text-sm">
              Airport: {departureAirportName}
            </h1>
          </div>

          {/* Divider */}
          <div className="hidden xl:block w-1/6 border border-themePurple"></div>

          {/* Middle Card */}
          <div className="flex flex-col items-center justify-center gap-2 text-xs sm:text-sm">
            <div className="flex gap-2 items-center">
              <AirlinesIcon className="text-red-500" />
              <h1>{airlineName}</h1>
            </div>
            <FlightIcon className="text-themePurple rotate-90" />
            <div className="flex flex-col xl:flex-row justify-center items-center gap-1">
              <h1>
                {timeResult.hours}H {timeResult.minutes}m
              </h1>
              <h1>({routeLength})</h1>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden xl:block w-1/6 border border-themePurple"></div>

          {/* Last Card */}
          <div className="flex flex-col gap-1 items-end xl:items-start justify-start">
            <div className="flex items-center gap-1">
              <FlightLand className="text-slate-900" />
              <h1 className="text-slate-900 text-sm">Arrival</h1>
            </div>
            <h1 className="font-semibold text-slate-900 text-lg sm:text-xl">
              {flightArrivalTime}
            </h1>
            <h1 className="text-slate-900 font-light text-xs sm:text-sm">
              Airport: {arrivalAirportName}
            </h1>
          </div>
        </Box>

        {/* Footer Part */}
        <Box className="flex justify-between mt-6 mb-[-1rem] mr-[-1rem]">
          <div className="flex flex-col xl:mb-6 mb-4 items-start justify-start">
            <h1 className="text-themePurple font-semibold text-lg">
              Price: ${ticketPrice}
            </h1>
            <h1 className="text-sm">Round Trip</h1>
          </div>
          <div className="flex">
            <Button
              onClick={handleBookFlight}
              className="bg-themePurple hover:bg-themePurple/70 text-white text-sm px-8 py-4 rounded-tl-lg xl:rounded-br-lg  rounded-b-none rounded-r-none"
            >
              Book Flight
            </Button>
          </div>
        </Box>
      </div>
      {/* Hanging Button */}
      <div className="w-full sm:w-1/6 bg-themeDarkGrey flex justify-center rounded-lg rounded-t-none p-2">
        <h1 className="text-sm font-medium text-themePurple">
          Check the details
        </h1>
      </div>
    </div>
  );
}

export default FlightCardItem;
