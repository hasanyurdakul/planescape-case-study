import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { getToken } from "../utils/auth";
import { toast } from "react-toastify";

function BookedFlightCard({ flight, onFlightRemoved }) {
  const nodeApiUrl = import.meta.env.VITE_NODE_API_URL;

  const token = getToken();

  const handleRemoveFlight = () => {
    axios
      .post(`${nodeApiUrl}/user/flights/remove`, flight, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Flight removed successfully");
        onFlightRemoved(flight._id); // Notify parent to update the state
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to remove flight");
      });
  };

  return (
    <div className="w-full bg-white rounded-lg p-4 lg:p-6 xl:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Airline Image */}
        <div className="lg:col-span-1 flex items-center justify-center p-2 lg:p-4">
          <div className="w-12 h-12 text-lg rounded-full uppercase bg-themePurple text-white flex items-center justify-center">
            {flight.airlineName.slice(0, 2)}
          </div>
        </div>
        {/* Flight Info */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          {/* Flight Hours */}
          <h1 className="text-xl lg:text-4xl">
            {flight.flightDepartureTime} - {flight.flightArrivalTime}
          </h1>
          {/* Other Info */}
          <div className="flex flex-col lg:flex-row lg:justify-between mt-2 lg:mt-4">
            {/* Airline Name ve Flight Details Butonu */}
            <div>
              <h1 className="font-medium text-base">{flight.airlineName}</h1>
              <h1 className="text-sm text-themePurple cursor-pointer">
                Flight Details
              </h1>
            </div>
            {/* Route Length ve Timespan */}
            <div className="mt-2 lg:mt-0">
              <h1 className="font-medium text-base">{flight.routeLength}</h1>
              <h1 className="text-sm text-themePurple">
                {flight.timespan.hours}h {flight.timespan.minutes}m
              </h1>
            </div>
            {/* Departure, Arrival ve FlightName */}
            <div className="mt-2 lg:mt-0">
              <h1 className="font-medium text-base">
                {flight.departureAirportName} to {flight.arrivalAirportName}
              </h1>
              <h1 className="text-sm text-themePurple">{flight.flightName}</h1>
            </div>
          </div>
        </div>
        {/* Upgrade Options */}
        <div className="lg:col-span-6 flex flex-wrap lg:flex-nowrap gap-2 lg:gap-4 mt-4 lg:mt-0 justify-end ">
          <div className="w-full lg:w-[13%] bg-white rounded-lg border border-themeDarkGrey py-4 flex flex-col justify-around items-center">
            <h1 className="font-semibold text-xl">${flight.ticketPrice}</h1>
            <h1 className="text-sm text-slate-500">Main</h1>
          </div>
          <div className="hidden lg:flex lg:w-[13%] bg-themeDarkGrey rounded-lg border border-themeLightGrey py-4"></div>
          <div className="hidden lg:flex lg:w-[13%] bg-themeDarkGrey rounded-lg border border-themeLightGrey py-4"></div>
          <div className="hidden lg:flex lg:w-[13%] bg-themeDarkGrey rounded-lg border border-themeLightGrey py-4"></div>
          <div className="hidden lg:flex lg:w-[13%] bg-themeDarkGrey rounded-lg border border-themeLightGrey py-4"></div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button
          variant="contained"
          className="bg-themePurple normal-case text-white hover:bg-themePurple/70"
          onClick={handleRemoveFlight}
        >
          Cancel Flight
        </Button>
      </div>
    </div>
  );
}

export default BookedFlightCard;
