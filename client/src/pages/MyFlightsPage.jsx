import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Rating, CircularProgress } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BookedFlightCard from "../components/BookedFlightCard";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import { jwtDecode } from "jwt-decode"; // Corrected import statement
import axios from "axios";

function MyFlightsPage() {
  const [bookedFlights, setBookedFlights] = useState([]);
  const [totalTicketPrice, setTotalTicketPrice] = useState(0); // Toplam bilet fiyatı için state
  const token = getToken();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const nodeApiUrl = import.meta.env.VITE_NODE_API_URL;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    axios
      .get(`${nodeApiUrl}/user/flights`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBookedFlights(res.data.flights);
        calculateTotalTicketPrice(res.data.flights); // Toplam bilet fiyatını hesapla
      })
      .catch((err) => {
        console.error("Error fetching flights:", err);
      });
  }, [token]);

  // Toplam bilet fiyatını hesaplayan fonksiyon
  const calculateTotalTicketPrice = (flights) => {
    const totalPrice = flights.reduce(
      (sum, flight) => sum + flight.ticketPrice,
      0
    );
    setTotalTicketPrice(totalPrice);
  };

  // Flight removal handler
  const handleFlightRemoved = (flightId) => {
    const updatedFlights = bookedFlights.filter(
      (flight) => flight._id !== flightId
    );
    setBookedFlights(updatedFlights);
    calculateTotalTicketPrice(updatedFlights); // Update the total price
  };

  return (
    <div className="flex flex-col min-h-screen  ">
      <div className="bg-white rounded-lg w-full h-full">
        {/* Top Buttons Bar */}
        <div className="flex flex-col  xl:flex-row justify-center xl:justify-between  p-4 w-full">
          {/* Buttons */}
          <div className="gap-2 flex xl:flex flex-wrap justify-around sm:items-center">
            <Button
              variant="outlined"
              className="w-full xl:w-fit bg-white py-0 px-6 xl:py-2 border border-themePurple hover:border-themePurple text-themePurple rounded-lg"
            >
              Times
            </Button>
            <Button
              variant="outlined"
              className="w-full xl:w-fit bg-white py-0 px-6 xl:py-2 border border-themePurple hover:border-themePurple text-themePurple rounded-lg"
            >
              Stops
            </Button>
            <Button
              variant="outlined"
              className="w-full xl:w-fit bg-white py-0 px-6 xl:py-2 border border-themePurple hover:border-themePurple text-themePurple rounded-lg"
            >
              Airlines
            </Button>
            <Button
              variant="outlined"
              className="w-full xl:w-fit bg-white py-0 px-6 xl:py-2 border border-themePurple hover:border-themePurple text-themePurple rounded-lg"
            >
              Airports
            </Button>
            <Button
              variant="outlined"
              className="w-full xl:w-fit bg-white py-0 px-6 xl:py-2 border border-themePurple hover:border-themePurple text-themePurple rounded-lg"
            >
              Amenities
            </Button>
            <Button
              variant="outlined"
              className="w-full xl:w-fit bg-white py-0 px-6 xl:py-2 border border-themePurple hover:border-themePurple text-themePurple rounded-lg"
            >
              Edit Search
            </Button>
          </div>
          {/* Stars */}
          <div className="gap-2 flex flex-row flex-wrap justify-around xl:justify-between mt-4 xl:mt-0">
            {/* 2 Stars */}
            <Button className="flex flex-row p-0 rounded-lg text-themePurple w-fit">
              <Rating
                size="small"
                readOnly
                defaultValue={2}
                max={6}
                className="flex  flex-row flex-wrap text-themePurple w-fit"
              />
            </Button>
            <Divider orientation="vertical" flexItem />
            {/* 3 Stars */}
            <Button className="flex flex-row  p-0 rounded-lg text-themePurple w-fit">
              <Rating
                size="small"
                readOnly
                defaultValue={3}
                max={6}
                className="flex  flex-row flex-wrap text-themePurple w-fit"
              />
            </Button>
            <Divider
              orientation="vertical"
              flexItem
              className="hidden xl:flex"
            />
            {/* 4 Stars */}
            <Button className="flex flex-row  p-0 rounded-lg text-themePurple w-fit">
              <Rating
                size="small"
                readOnly
                defaultValue={4}
                max={6}
                className="flex w-full flex-row flex-wrap text-themePurple"
              />
            </Button>
            <Divider orientation="vertical" flexItem />
            {/* 5 Stars */}
            <Button className="flex flex-row  p-0 rounded-lg text-themePurple w-fit">
              <Rating
                size="small"
                readOnly
                defaultValue={5}
                max={6}
                className="flex w-full flex-row flex-wrap text-themePurple"
              />
            </Button>
            <Divider
              orientation="vertical"
              flexItem
              className="hidden xl:flex"
            />
            {/* 6 Stars */}
            <Button className="flex flex-row p-0 rounded-lg text-themePurple w-fit">
              <Rating
                size="small"
                readOnly
                defaultValue={6}
                max={6}
                className="flex w-full flex-row flex-wrap text-themePurple"
              />
            </Button>
          </div>
        </div>
      </div>
      {/* Flights List */}
      <div className="bg-themeLightGrey w-full py-4">
        {/* Sort and Info Tab */}
        <div className="flex flex-row justify-between mb-4">
          <div className="flex gap-0 xl:gap-1 flex-col xl:flex-row">
            <h1 className="text-lg">Sort by:</h1>
            <h1 className="text-lg font-semibold">Recommended</h1>
          </div>
          <div className="flex gap-0 xl:gap-1 flex-col xl:flex-row items-end xl:items-center">
            <div className="flex items-center gap-1">
              <InfoOutlinedIcon className="text-themePurple text-lg" />
              <h1 className="text-lg">Total Fare:</h1>
            </div>
            <h1 className="text-lg font-semibold">${totalTicketPrice}</h1>{" "}
          </div>
        </div>
        {/* Flights */}
        <div className="flex flex-col gap-6">
          {bookedFlights.map((flight, key) => (
            <BookedFlightCard
              key={key}
              flight={flight}
              onFlightRemoved={handleFlightRemoved}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyFlightsPage;
