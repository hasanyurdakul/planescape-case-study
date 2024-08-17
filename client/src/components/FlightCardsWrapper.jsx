import React from "react";
import FlightCardItem from "./FlightCardItem";

function FlightCardsWrapper({ flights = [] }) {
  return (
    <div className="flex flex-col gap-8">
      {flights.length > 0 ? (
        flights.map((flight) => (
          <FlightCardItem key={flight.id} flight={flight} />
        ))
      ) : (
        <div className="text-center text-gray-500">
          Aradığınız uçuş bulunamadı.
        </div>
      )}
    </div>
  );
}

export default FlightCardsWrapper;
